// src/pages/AdminPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import LoadingIndicator from '../components/ui/LoadingIndicator'; // Import loading indicator

interface Project {
  // Keep interface complete as it's used for editing form population
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
  images: string[]; // Store URLs here after upload
}

// Type for form data, images are handled separately before DB insert/update
type ProjectFormData = Omit<Project, 'images'> & {
    features: string; // Store features as a single string in the form
    imageFiles: File[]; // Store uploaded files temporarily
};

const AdminPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true); // Loading state for project list
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state for form submission
  const [error, setError] = useState<string | null>(null); // General error state
  const initialFormData: ProjectFormData = {
    id: '', title: '', category: '', client: '', location: '', completion_date: '',
    description: '', challenge: '', solution: '', features: '', imageFiles: []
  };
  const [formData, setFormData] = useState<ProjectFormData>(initialFormData);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const navigate = useNavigate();

  // Fetch projects on mount
  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoadingProjects(true);
      setError(null);
      // Select only needed fields for the list display initially
      const { data, error: fetchError } = await supabase
          .from('projects')
          .select('id, title, category, client, location, completion_date, description, challenge, solution, features, images'); // Fetch all needed for edit

      if (fetchError) {
        console.error('Error fetching projects:', fetchError);
        setError('Failed to load existing projects.');
      } else {
        setProjects(data || []);
      }
      setIsLoadingProjects(false);
    };
    fetchProjects();
  }, []);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
     const { name, value } = e.target;
     setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle file input changes
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     if (e.target.files) {
         setFormData(prev => ({ ...prev, imageFiles: Array.from(e.target.files || []) }));
     }
  };

  // Handle form submission (add or update project)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    let uploadedImageUrls: string[] = editingProject ? [...editingProject.images] : []; // Keep existing images if editing

    try {
      // Upload NEW images if any were selected
      if (formData.imageFiles.length > 0) {
          const newImageUrls = await Promise.all(
              formData.imageFiles.map(async (file) => {
                  const filePath = `public/${Date.now()}-${file.name.replace(/\s+/g, '_')}`; // Ensure unique names
                  const { data, error: uploadError } = await supabase.storage
                      .from('project-images') // Ensure this bucket exists and has correct policies
                      .upload(filePath, file);

                  if (uploadError) {
                      console.error('Error uploading image:', uploadError);
                      throw new Error(`Failed to upload ${file.name}: ${uploadError.message}`);
                  }
                  // Get public URL correctly
                  const { data: urlData } = supabase.storage.from('project-images').getPublicUrl(data.path);
                  return urlData.publicUrl;
              })
          );
          // If editing, add new URLs to existing ones. If adding, use only new URLs.
          uploadedImageUrls = editingProject ? [...uploadedImageUrls, ...newImageUrls] : newImageUrls;
      }


      const projectDataToSave = {
        // id: formData.id, // ID is primary key, usually shouldn't be updated manually unless intended
        title: formData.title,
        category: formData.category,
        client: formData.client,
        location: formData.location,
        completion_date: formData.completion_date,
        description: formData.description,
        challenge: formData.challenge,
        solution: formData.solution,
        features: formData.features.split('\n').map(f => f.trim()).filter(Boolean), // Convert string back to array
        images: uploadedImageUrls, // Use the final list of URLs
      };

      if (editingProject) {
        // Update existing project
        const { error: updateError } = await supabase
          .from('projects')
          .update(projectDataToSave)
          .eq('id', editingProject.id); // Match by ID

        if (updateError) throw updateError;

        // Update local state
        setProjects(projects.map((p) => (p.id === editingProject.id ? { ...p, ...projectDataToSave, id: editingProject.id } : p)));
        alert('Project updated successfully!');
        resetForm(); // Reset form after successful update

      } else {
        // Add new project
        const projectDataWithId = { ...projectDataToSave, id: formData.id }; // Include ID for insert if manually set
        const { data: insertedData, error: insertError } = await supabase
          .from('projects')
          .insert(projectDataWithId)
          .select() // Select to get the inserted row back (including potentially auto-gen ID if not provided)
          .single();

        if (insertError) throw insertError;

        if (insertedData) {
             setProjects([...projects, insertedData as Project]); // Add the newly created project to state
             alert('Project added successfully!');
             resetForm(); // Reset form after successful addition
        } else {
             throw new Error("Failed to get inserted project data.");
        }
      }
    } catch (err: any) {
      console.error('Error submitting project:', err);
      setError(`Operation failed: ${err.message}`);
      alert(`Error: ${err.message}`); // Show error to user
    } finally {
      setIsSubmitting(false); // Finish submission loading state
    }
  };

  // Function to reset form and editing state
  const resetForm = () => {
      setFormData(initialFormData);
      setEditingProject(null);
      // Reset file input visually if possible (might need useRef)
      const fileInput = document.getElementById('projectImages') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
  };

  // Handle edit button click
  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      id: project.id, // Keep ID for potential use, but disable input
      title: project.title,
      category: project.category,
      client: project.client,
      location: project.location,
      completion_date: project.completion_date,
      description: project.description,
      challenge: project.challenge,
      solution: project.solution,
      features: project.features?.join('\n') || '', // Join array back to string
      imageFiles: [], // Clear file input when starting edit
    });
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to form
  };

  // Handle delete button click
  const handleDelete = async (projectToDelete: Project) => {
    if (confirm(`Are you sure you want to delete "${projectToDelete.title}"? This action cannot be undone.`)) {
      setIsSubmitting(true); // Use submitting state for delete operation as well
      setError(null);
      try {
          // Optional: Delete associated images from storage first
          if (projectToDelete.images && projectToDelete.images.length > 0) {
              const filePaths = projectToDelete.images.map(url => {
                   // Extract path from URL, e.g., "public/image.jpg"
                   // This logic depends heavily on your Supabase URL structure
                   const urlParts = url.split('/project-images/');
                   return urlParts.length > 1 ? decodeURIComponent(urlParts[1]) : null;
              }).filter(path => path !== null) as string[];

              if (filePaths.length > 0) {
                  const { error: storageError } = await supabase.storage
                      .from('project-images')
                      .remove(filePaths);
                  if (storageError) {
                      console.warn('Could not delete some images from storage:', storageError);
                      // Decide if you want to proceed with DB deletion even if image deletion fails
                  }
              }
          }

          // Delete project from database
          const { error: deleteError } = await supabase
              .from('projects')
              .delete()
              .eq('id', projectToDelete.id);

          if (deleteError) throw deleteError;

          // Update local state
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


  // Handle logout
  const handleLogout = async () => {
    setError(null);
    const { error: logoutError } = await supabase.auth.signOut();
    if (logoutError) {
        setError(`Logout failed: ${logoutError.message}`);
    } else {
        navigate('/admin/login');
    }
  };

  return (
    <div className="pt-16 pb-16 bg-secondary-50 min-h-screen">
      <div className="container-custom">
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
            </div>
        )}

        {/* Form for adding/editing projects */}
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md mb-12">
            <h2 className="text-2xl font-semibold mb-4">{editingProject ? `Editing: ${editingProject.title}` : 'Add New Project'}</h2>
          {/* ID Field (Consider if manual ID setting is needed) */}
          <div>
            <label htmlFor="projectId" className="block text-sm font-medium text-secondary-700">Project ID (Unique Slug)</label>
            <input
              type="text"
              id="projectId"
              name="id" // Ensure name matches state key
              value={formData.id}
              onChange={handleInputChange}
              className="input-field mt-1"
              required
              pattern="^[a-z0-9-]+$" // Example pattern: lowercase letters, numbers, hyphens
              title="Use lowercase letters, numbers, and hyphens only (e.g., 'new-kitchen-remodel')"
              disabled={!!editingProject} // Disable ID editing
              placeholder="e.g., modern-bathroom-atlanta"
            />
            {!editingProject && <p className="text-xs text-gray-500 mt-1">Once set, the ID cannot be changed.</p>}
          </div>

          {/* Title Field */}
          <div>
            <label htmlFor="projectTitle" className="block text-sm font-medium text-secondary-700">Title</label>
            <input
              type="text"
              id="projectTitle"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="input-field mt-1"
              required
              placeholder="Modern Kitchen Remodel"
            />
          </div>

           {/* Category Field */}
          <div>
            <label htmlFor="projectCategory" className="block text-sm font-medium text-secondary-700">Category</label>
            <input
              type="text"
              id="projectCategory"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="input-field mt-1"
              required
              placeholder="Kitchen Remodeling, New Construction, etc."
            />
          </div>

          {/* Client Field */}
          <div>
            <label htmlFor="projectClient" className="block text-sm font-medium text-secondary-700">Client Name</label>
            <input
              type="text"
              id="projectClient"
              name="client"
              value={formData.client}
              onChange={handleInputChange}
              className="input-field mt-1"
              required
              placeholder="John & Jane Doe"
            />
          </div>

          {/* Location Field */}
           <div>
            <label htmlFor="projectLocation" className="block text-sm font-medium text-secondary-700">Location</label>
            <input
              type="text"
              id="projectLocation"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="input-field mt-1"
              required
              placeholder="Atlanta, GA"
            />
          </div>

           {/* Completion Date Field */}
          <div>
            <label htmlFor="projectCompletionDate" className="block text-sm font-medium text-secondary-700">Completion Date</label>
            <input
              type="text" // Use text for flexibility (e.g., "Fall 2023", "2024-03-15") or change to type="date"
              id="projectCompletionDate"
              name="completion_date"
              value={formData.completion_date}
              onChange={handleInputChange}
              className="input-field mt-1"
              required
              placeholder="e.g., March 2024"
            />
          </div>

           {/* Description Field */}
          <div>
            <label htmlFor="projectDescription" className="block text-sm font-medium text-secondary-700">Description</label>
            <textarea
              id="projectDescription"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="input-field mt-1"
              required
              rows={4}
              placeholder="Detailed description of the project scope and outcome."
            />
          </div>

          {/* Challenge Field */}
          <div>
            <label htmlFor="projectChallenge" className="block text-sm font-medium text-secondary-700">Challenge</label>
            <textarea
              id="projectChallenge"
              name="challenge"
              value={formData.challenge}
              onChange={handleInputChange}
              className="input-field mt-1"
              rows={3} // Adjusted rows
              placeholder="Describe the main challenges faced during the project."
            />
          </div>

          {/* Solution Field */}
          <div>
            <label htmlFor="projectSolution" className="block text-sm font-medium text-secondary-700">Solution</label>
            <textarea
              id="projectSolution"
              name="solution"
              value={formData.solution}
              onChange={handleInputChange}
              className="input-field mt-1"
              rows={3} // Adjusted rows
              placeholder="Explain how the challenges were overcome and the solutions implemented."
            />
          </div>

           {/* Features Field */}
          <div>
            <label htmlFor="projectFeatures" className="block text-sm font-medium text-secondary-700">Key Features (one per line)</label>
            <textarea
              id="projectFeatures"
              name="features"
              value={formData.features}
              onChange={handleInputChange}
              className="input-field mt-1"
              placeholder="Feature 1
Feature 2
Feature 3" // Use 
 for newline in placeholder
              required
              rows={4}
            />
          </div>

          {/* Images Field */}
          <div>
            <label htmlFor="projectImages" className="block text-sm font-medium text-secondary-700">
                {editingProject ? 'Add More Images' : 'Upload Images'}
            </label>
            <input
              type="file"
              id="projectImages"
              name="imageFiles" // Use a different name than the state array for URLs
              multiple
              onChange={handleFileChange}
              className="block w-full text-sm text-secondary-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 mt-1"
              accept="image/png, image/jpeg, image/webp, image/gif" // Specify accepted formats
            />
            {editingProject && project?.images.length > 0 && (
                <p className="text-xs text-gray-500 mt-1">Current images will be kept. Upload new files to add them.</p>
            )}
             {/* Display selected file names */}
            {formData.imageFiles.length > 0 && (
                <div className="mt-2 text-sm text-gray-600">
                    Selected files: {formData.imageFiles.map(f => f.name).join(', ')}
                </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary disabled:opacity-50"
            >
              {isSubmitting ? (
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
              ) : null}
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
          <p className="text-secondary-600">No projects found.</p>
        ) : (
          <div className="space-y-4">
            {projects.map((project) => (
              <div
                key={project.id}
                className="p-4 md:p-6 border rounded-lg bg-white shadow-sm flex flex-col md:flex-row justify-between md:items-center"
              >
                <div className='mb-4 md:mb-0'>
                  <h3 className="text-lg font-semibold text-secondary-900">{project.title}</h3>
                  <p className="text-sm text-secondary-600">{project.category} <span className='mx-1'>|</span> ID: <code className='text-xs bg-gray-100 px-1 rounded'>{project.id}</code></p>
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
                    onClick={() => handleDelete(project)}
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