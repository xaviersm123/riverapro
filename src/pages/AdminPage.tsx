// src/pages/AdminPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import LoadingIndicator from '../components/ui/LoadingIndicator'; // Your loading indicator
import { Loader2, ArrowUp, ArrowDown, Trash2 } from 'lucide-react'; // Icons

interface Project {
  id: string;
  title: string;
  category: string;
  client: string;
  location: string;
  completion_date: string;
  description: string;
  challenge: string;
  solution: string;
  features: string[];
  images: string[]; // Array of image URLs
}

// Type for form data
type ProjectFormData = Omit<Project, 'images' | 'features'> & {
    features: string;   // Store features as a single string in the form
    imageFiles: File[]; // Store NEW uploaded files temporarily
};

const AdminPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initialFormData: ProjectFormData = {
    id: '', title: '', category: '', client: '', location: '', completion_date: '',
    description: '', challenge: '', solution: '', features: '', imageFiles: []
  };
  const [formData, setFormData] = useState<ProjectFormData>(initialFormData);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // State specifically for managing images during an edit session
  const [editableImages, setEditableImages] = useState<string[]>([]); // URLs in current edit order
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]); // URLs marked for deletion from storage

  const navigate = useNavigate();

  // --- Effects ---
  useEffect(() => {
    fetchProjects();
  }, []); // Fetch projects on mount

  // --- Data Fetching ---
  const fetchProjects = async () => {
    setIsLoadingProjects(true);
    setError(null);
    const { data, error: fetchError } = await supabase
      .from('projects')
      .select('id, title, category, client, location, completion_date, description, challenge, solution, features, images')
      .order('created_at', { ascending: false }); // Optional: order by creation date

    if (fetchError) {
      console.error('Error fetching projects:', fetchError);
      setError('Failed to load existing projects.');
    } else {
      setProjects(data || []);
    }
    setIsLoadingProjects(false);
  };

  // --- Form Handling ---
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({ ...prev, imageFiles: Array.from(e.target.files || []) }));
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setEditingProject(null);
    setEditableImages([]); // Clear images being edited
    setImagesToDelete([]); // Clear deletion queue
    // Reset file input visually
    const fileInput = document.getElementById('projectImages') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
    setError(null);
    setIsSubmitting(false);
  };

  // --- Edit Actions ---
  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      id: project.id,
      title: project.title,
      category: project.category,
      client: project.client,
      location: project.location,
      completion_date: project.completion_date,
      description: project.description,
      challenge: project.challenge,
      solution: project.solution,
      features: project.features?.join('\n') || '',
      imageFiles: [], // Clear file input selection
    });
    setEditableImages(project.images || []); // Load current images into editable state
    setImagesToDelete([]); // Reset deletion list for this edit session
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- Image Management Actions (during edit) ---
  const handleMoveImage = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= editableImages.length) return; // Bounds check

    const newImages = [...editableImages];
    const [movedItem] = newImages.splice(fromIndex, 1); // Remove item
    newImages.splice(toIndex, 0, movedItem); // Insert item at new position
    setEditableImages(newImages);
  };

  const handleDeleteImage = (indexToDelete: number) => {
    const imageToRemoveUrl = editableImages[indexToDelete];
    if (!imageToRemoveUrl) return;

    if (confirm(`Are you sure you want to remove this image? It will be permanently deleted from storage when you update the project.`)) {
        // Add URL to the list of images to delete from storage upon successful form submission
        setImagesToDelete(prev => [...prev, imageToRemoveUrl]);
        // Remove image from the displayed list in the UI
        setEditableImages(prev => prev.filter((_, index) => index !== indexToDelete));
    }
  };

  // --- Main Submit (Add/Update) ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.id && !editingProject) {
         alert("Project ID (slug) is required for new projects.");
         return;
    }
    setIsSubmitting(true);
    setError(null);

    let newlyUploadedUrls: string[] = [];
    let finalImageUrls: string[] = [];

    try {
        // 1. Delete images marked for removal from Storage (only if editing)
        if (editingProject && imagesToDelete.length > 0) {
            console.log("Attempting to delete images from storage:", imagesToDelete);
            const pathsToDelete = imagesToDelete.map(url => {
                try {
                    const urlObject = new URL(url);
                    // Pathname might be like: /storage/v1/object/public/project-images/public/image.jpg
                    const pathSegments = urlObject.pathname.split('/');
                    const bucketIndex = pathSegments.indexOf('project-images'); // Find your bucket name segment
                    if (bucketIndex > -1 && bucketIndex < pathSegments.length - 1) {
                        return decodeURIComponent(pathSegments.slice(bucketIndex + 1).join('/'));
                    }
                    console.warn(`Could not determine storage path from URL: ${url}`);
                    return null;
                } catch (e) {
                    console.error(`Invalid URL format for deletion: ${url}`, e);
                    return null;
                }
            }).filter(path => path !== null) as string[];

            if (pathsToDelete.length > 0) {
                console.log("Extracted paths to delete:", pathsToDelete);
                const { error: storageError } = await supabase.storage
                    .from('project-images') // Your bucket name
                    .remove(pathsToDelete);

                if (storageError) {
                    // Log warning but continue with DB update. Consider more robust error handling if needed.
                    console.warn('Warning: Failed to delete some images from storage:', storageError);
                    setError(`Warning: Project data saved, but failed to delete ${pathsToDelete.length} old image(s) from storage. ${storageError.message}`);
                    // Decide if you want to stop the process here or continue. Continuing is often preferred.
                } else {
                    console.log("Successfully deleted images from storage:", pathsToDelete);
                    // Don't clear imagesToDelete yet, clear it only on final success of the whole submit operation
                }
            }
        }

        // 2. Upload NEW images if any were selected
        if (formData.imageFiles.length > 0) {
            newlyUploadedUrls = await Promise.all(
                formData.imageFiles.map(async (file) => {
                    const fileExt = file.name.split('.').pop();
                    const randomId = Math.random().toString(36).substring(2, 15); // More unique filename
                    const filePath = `public/${formData.id || editingProject?.id}-${randomId}.${fileExt}`; // Use project ID in path
                    const { data, error: uploadError } = await supabase.storage
                        .from('project-images')
                        .upload(filePath, file);

                    if (uploadError) {
                        throw new Error(`Failed to upload ${file.name}: ${uploadError.message}`);
                    }
                    const { data: urlData } = supabase.storage.from('project-images').getPublicUrl(data.path);
                    return urlData.publicUrl;
                })
            );
        }

        // 3. Determine the final list of image URLs for the database
        if (editingProject) {
            // Combine the current state of editable images (reflecting reorders and UI deletions)
            // with any newly uploaded URLs
            finalImageUrls = [...editableImages, ...newlyUploadedUrls];
        } else {
            // For new projects, only use the newly uploaded URLs
            finalImageUrls = newlyUploadedUrls;
        }

        // 4. Prepare data for saving (DB)
        const projectDataToSave = {
            // id: formData.id, // ID is PK, don't update it directly in an UPDATE operation
            title: formData.title,
            category: formData.category,
            client: formData.client,
            location: formData.location,
            completion_date: formData.completion_date,
            description: formData.description,
            challenge: formData.challenge,
            solution: formData.solution,
            features: formData.features.split('\n').map(f => f.trim()).filter(Boolean), // Convert string back to array
            images: finalImageUrls, // Use the final, ordered list
        };

        // 5. Save to Database (Update or Insert)
        if (editingProject) {
            // Update existing project
            const { error: updateError } = await supabase
                .from('projects')
                .update(projectDataToSave)
                .eq('id', editingProject.id); // Match by ID

            if (updateError) throw updateError;

            // Update local state
            setProjects(projects.map((p) =>
                p.id === editingProject.id ? { ...p, ...projectDataToSave, images: finalImageUrls, id: editingProject.id } : p
            ));
            alert('Project updated successfully!');

        } else {
            // Add new project
            const projectDataWithId = { ...projectDataToSave, id: formData.id }; // Include ID for insert
            const { data: insertedData, error: insertError } = await supabase
                .from('projects')
                .insert(projectDataWithId)
                .select() // Select to get the inserted row back
                .single();

            if (insertError) {
                 // Check for unique constraint violation (duplicate ID)
                 if (insertError.code === '23505') { // PostgreSQL unique violation code
                      throw new Error(`Project ID "${formData.id}" already exists. Please choose a unique ID.`);
                 }
                 throw insertError; // Throw other insert errors
            }

            if (insertedData) {
                setProjects([insertedData as Project, ...projects]); // Add to the beginning of the list
                alert('Project added successfully!');
            } else {
                throw new Error("Failed to get inserted project data.");
            }
        }

        // 6. Success - Reset form and clear temporary states
        resetForm();

    } catch (err: any) {
        console.error('Error submitting project:', err);
        setError(`Operation failed: ${err.message || 'An unknown error occurred.'}`);
        alert(`Error: ${err.message || 'An unknown error occurred.'}`);
        // NOTE: imagesToDelete is NOT cleared here, so a retry might re-attempt deletion.
    } finally {
        setIsSubmitting(false); // Finish submission loading state
    }
  };


  // --- Delete Project Action ---
  const handleDeleteProject = async (projectToDelete: Project) => {
      if (confirm(`Are you sure you want to delete "${projectToDelete.title}"? This will also delete associated images and cannot be undone.`)) {
          setIsSubmitting(true); // Use submitting state for delete operation
          setError(null);
          try {
              // 1. Delete associated images from storage first
              if (projectToDelete.images && projectToDelete.images.length > 0) {
                  const pathsToDelete = projectToDelete.images.map(url => {
                     try {
                          const urlObject = new URL(url);
                          const pathSegments = urlObject.pathname.split('/');
                          const bucketIndex = pathSegments.indexOf('project-images');
                          if (bucketIndex > -1 && bucketIndex < pathSegments.length - 1) {
                              return decodeURIComponent(pathSegments.slice(bucketIndex + 1).join('/'));
                          }
                          return null;
                      } catch (e) { return null; }
                  }).filter(path => path !== null) as string[];

                  if (pathsToDelete.length > 0) {
                      console.log("Deleting images for project:", projectToDelete.id, pathsToDelete);
                      const { error: storageError } = await supabase.storage
                          .from('project-images')
                          .remove(pathsToDelete);
                      if (storageError) {
                          // Log warning, but proceed with DB deletion as it's often more critical
                          console.warn('Could not delete some/all images from storage:', storageError);
                          alert(`Warning: Could not delete images from storage, but will attempt to delete project record. ${storageError.message}`);
                      }
                  }
              }

              // 2. Delete project from database
              const { error: deleteError } = await supabase
                  .from('projects')
                  .delete()
                  .eq('id', projectToDelete.id);

              if (deleteError) throw deleteError;

              // 3. Update local state
              setProjects(projects.filter((p) => p.id !== projectToDelete.id));
              alert('Project deleted successfully!');
              if (editingProject?.id === projectToDelete.id) {
                  resetForm(); // Reset form if the deleted project was being edited
              }
          } catch (err: any) {
              console.error('Error deleting project:', err);
              setError(`Failed to delete project: ${err.message}`);
              alert(`Error deleting project: ${err.message}`);
          } finally {
              setIsSubmitting(false);
          }
      }
  };

  // --- Auth ---
  const handleLogout = async () => {
      setError(null);
      setIsSubmitting(true); // Disable buttons during logout
      const { error: logoutError } = await supabase.auth.signOut();
      setIsSubmitting(false);
      if (logoutError) {
          setError(`Logout failed: ${logoutError.message}`);
          alert(`Logout failed: ${logoutError.message}`);
      } else {
          navigate('/admin/login');
      }
  };

  // --- Render ---
  return (
    <div className="pt-16 pb-16 bg-secondary-50 min-h-screen">
      <div className="container mx-auto px-4"> {/* Use standard container */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-secondary-900">
            Admin Dashboard
          </h1>
          <button
            onClick={handleLogout}
            disabled={isSubmitting}
            className="btn btn-secondary bg-red-100 text-red-700 hover:bg-red-200 disabled:opacity-50"
          >
            Logout
          </button>
        </div>

        {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
                <strong className="font-bold">Error:</strong>
                <span className="block sm:inline"> {error}</span>
                 <button onClick={() => setError(null)} className="absolute top-0 bottom-0 right-0 px-4 py-3 text-red-700">
                     <span>×</span> {/* Close button */}
                 </button>
            </div>
        )}

        {/* Form for adding/editing projects */}
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md mb-12">
            <h2 className="text-2xl font-semibold mb-4">{editingProject ? `Editing: ${editingProject.title}` : 'Add New Project'}</h2>

           {/* Project ID */}
            <div>
                <label htmlFor="projectId" className="block text-sm font-medium text-secondary-700">Project ID (Unique URL Slug)</label>
                <input
                type="text"
                id="projectId"
                name="id"
                value={formData.id}
                onChange={handleInputChange}
                className="input-field mt-1 w-full" // Use w-full
                required
                pattern="^[a-z0-9]+(?:-[a-z0-9]+)*$" // Allow lowercase, numbers, and hyphens (not starting/ending with hyphen)
                title="Lowercase letters, numbers, hyphens only (e.g., 'new-kitchen-remodel'). Cannot start/end with hyphen."
                disabled={!!editingProject} // Disable ID editing
                placeholder="e.g., modern-bathroom-atlanta"
                />
                {!editingProject && <p className="text-xs text-gray-500 mt-1">Choose a unique ID (URL slug). Once set, it cannot be changed.</p>}
            </div>

            {/* Other Text Fields (Title, Category, Client, etc.) - Condensed for brevity */}
            {/* Ensure each has 'name', 'value', 'onChange', 'className="input-field mt-1 w-full"' */}
            <div><label htmlFor="projectTitle">Title</label><input type="text" id="projectTitle" name="title" value={formData.title} onChange={handleInputChange} className="input-field mt-1 w-full" required /></div>
            <div><label htmlFor="projectCategory">Category</label><input type="text" id="projectCategory" name="category" value={formData.category} onChange={handleInputChange} className="input-field mt-1 w-full" required /></div>
            <div><label htmlFor="projectClient">Client</label><input type="text" id="projectClient" name="client" value={formData.client} onChange={handleInputChange} className="input-field mt-1 w-full" required /></div>
            <div><label htmlFor="projectLocation">Location</label><input type="text" id="projectLocation" name="location" value={formData.location} onChange={handleInputChange} className="input-field mt-1 w-full" required /></div>
            <div><label htmlFor="projectCompletionDate">Completion Date</label><input type="text" id="projectCompletionDate" name="completion_date" value={formData.completion_date} onChange={handleInputChange} className="input-field mt-1 w-full" required placeholder="e.g., March 2024" /></div>
            <div><label htmlFor="projectDescription">Description</label><textarea id="projectDescription" name="description" value={formData.description} onChange={handleInputChange} className="input-field mt-1 w-full" rows={4} required /></div>
            <div><label htmlFor="projectChallenge">Challenge</label><textarea id="projectChallenge" name="challenge" value={formData.challenge} onChange={handleInputChange} className="input-field mt-1 w-full" rows={3} /></div>
            <div><label htmlFor="projectSolution">Solution</label><textarea id="projectSolution" name="solution" value={formData.solution} onChange={handleInputChange} className="input-field mt-1 w-full" rows={3} /></div>
            <div><label htmlFor="projectFeatures">Key Features (one per line)</label><textarea id="projectFeatures" name="features" value={formData.features} onChange={handleInputChange} className="input-field mt-1 w-full" rows={4} required placeholder="Feature 1
Feature 2
Feature 3"/></div>


           {/* --- Image Management Section --- */}
           <div className="border-t pt-6 mt-6">
                <h3 className="text-lg font-medium text-secondary-700 mb-3">Manage Images</h3>

                 {/* Display Current Images (Only during Edit) */}
                 {editingProject && editableImages.length > 0 && (
                    <div className="mb-6 space-y-3">
                         <p className="text-sm text-gray-600 mb-2">
                             Current Images (First image is the main/thumbnail). Use arrows to reorder, trash icon to remove.
                         </p>
                         <ul className="space-y-2">
                            {editableImages.map((imageUrl, index) => (
                                <li key={`${imageUrl}-${index}`} className="flex items-center justify-between p-2 border rounded-md bg-gray-50">
                                <div className="flex items-center space-x-3 flex-grow overflow-hidden mr-2">
                                    <img src={imageUrl} alt={`Current image ${index + 1}`} className="h-14 w-14 object-cover rounded flex-shrink-0" />
                                    <div className='flex-grow overflow-hidden'>
                                        <span className="text-xs text-secondary-600 block truncate" title={imageUrl}>
                                            {imageUrl.substring(imageUrl.lastIndexOf('/') + 1)}
                                        </span>
                                        {index === 0 && <span className="text-xs font-semibold text-primary-600 block">(Main Thumbnail)</span>}
                                    </div>
                                </div>
                                <div className="flex space-x-1 flex-shrink-0">
                                    {/* Reorder Buttons */}
                                    <button
                                        type="button"
                                        onClick={() => handleMoveImage(index, index - 1)}
                                        disabled={index === 0 || isSubmitting}
                                        className="p-1.5 text-secondary-500 hover:text-secondary-700 disabled:opacity-40 disabled:cursor-not-allowed"
                                        title="Move Up"
                                    >
                                        <ArrowUp size={18} />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleMoveImage(index, index + 1)}
                                        disabled={index === editableImages.length - 1 || isSubmitting}
                                        className="p-1.5 text-secondary-500 hover:text-secondary-700 disabled:opacity-40 disabled:cursor-not-allowed"
                                        title="Move Down"
                                    >
                                        <ArrowDown size={18} />
                                    </button>
                                    {/* Delete Button */}
                                    <button
                                        type="button"
                                        onClick={() => handleDeleteImage(index)}
                                        disabled={isSubmitting}
                                        className="p-1.5 text-red-500 hover:text-red-700 disabled:opacity-40 disabled:cursor-not-allowed"
                                        title="Delete Image"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                                </li>
                            ))}
                         </ul>
                    </div>
                 )}

                 {/* File Input for Adding NEW Images */}
                 <div>
                    <label htmlFor="projectImages" className="block text-sm font-medium text-secondary-700">
                        {editingProject ? 'Upload More Images' : 'Upload Project Images'}
                    </label>
                    <input
                        type="file"
                        id="projectImages"
                        name="imageFiles"
                        multiple
                        onChange={handleFileChange}
                        className="block w-full text-sm text-secondary-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 mt-1"
                        accept="image/png, image/jpeg, image/webp, image/gif"
                        disabled={isSubmitting}
                    />
                     {/* Display selected file names */}
                    {formData.imageFiles.length > 0 && (
                        <div className="mt-2 text-sm text-gray-600">
                            Selected for upload: {formData.imageFiles.map(f => f.name).join(', ')}
                        </div>
                    )}
                 </div>
           </div>


           {/* Form Action Buttons */}
           <div className="flex space-x-4 pt-4 border-t mt-6">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary disabled:opacity-50 flex items-center justify-center" // Added flex/items-center/justify-center
                >
                {isSubmitting && <Loader2 className="h-5 w-5 animate-spin mr-2" />}
                {editingProject ? 'Update Project' : 'Add Project'}
                </button>
                {editingProject && (
                <button
                    type="button"
                    onClick={resetForm}
                    disabled={isSubmitting}
                    className="btn btn-secondary disabled:opacity-50"
                >
                    Cancel Edit
                </button>
                )}
           </div>
        </form>

        {/* List of existing projects */}
        <h2 className="text-3xl font-bold mb-6 text-secondary-900 mt-12">Existing Projects</h2>
        {isLoadingProjects ? (
          <LoadingIndicator message="Loading project list..." />
        ) : projects.length === 0 && !error ? (
          <p className="text-secondary-600">No projects found. Add one using the form above.</p>
        ) : (
          <div className="space-y-4">
            {projects.map((project) => (
              <div
                key={project.id}
                className="p-4 md:p-6 border rounded-lg bg-white shadow-sm flex flex-col md:flex-row justify-between md:items-center gap-4" // Added gap
              >
                <div className='flex-grow overflow-hidden mr-2'> {/* Added overflow-hidden */}
                  <h3 className="text-lg font-semibold text-secondary-900 truncate">{project.title}</h3>
                  <p className="text-sm text-secondary-600 truncate">
                      {project.category} <span className='mx-1'>|</span> ID: <code className='text-xs bg-gray-100 px-1 rounded'>{project.id}</code>
                  </p>
                  {/* Display Thumbnail */}
                  {project.images && project.images.length > 0 && (
                      <img src={project.images[0]} alt="Thumbnail" className='h-10 w-10 object-cover rounded mt-1 inline-block'/>
                  )}
                </div>
                <div className="flex space-x-3 flex-shrink-0">
                  <button
                    onClick={() => handleEdit(project)}
                    disabled={isSubmitting}
                    className="btn btn-secondary text-sm px-3 py-1.5 disabled:opacity-50"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProject(project)} // Use the updated handler name
                    disabled={isSubmitting}
                    className="btn bg-red-500 text-white hover:bg-red-600 text-sm px-3 py-1.5 disabled:opacity-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;