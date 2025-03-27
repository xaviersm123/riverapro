import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase'; // Adjust path to your supabase.ts file

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
  images: string[];
}

const AdminPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    category: '',
    client: '',
    location: '',
    completion_date: '',
    description: '',
    challenge: '',
    solution: '',
    features: '',
    images: [] as File[],
  });
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const navigate = useNavigate();

  // Fetch projects on mount
  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase.from('projects').select('*');
      if (error) {
        console.error('Error fetching projects:', error);
      } else {
        setProjects(data || []);
      }
    };
    fetchProjects();
  }, []);

  // Handle form submission (add or update project)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Upload images to Supabase Storage
    const imageUrls = await Promise.all(
      formData.images.map(async (file) => {
        const { data, error } = await supabase.storage
          .from('project-images')
          .upload(`${Date.now()}-${file.name}`, file);
        if (error) {
          console.error('Error uploading image:', error);
          throw error;
        }
        return supabase.storage.from('project-images').getPublicUrl(data.path).data.publicUrl;
      })
    );

    const projectData = {
      id: formData.id,
      title: formData.title,
      category: formData.category,
      client: formData.client,
      location: formData.location,
      completion_date: formData.completion_date,
      description: formData.description,
      challenge: formData.challenge,
      solution: formData.solution,
      features: formData.features.split('\n').filter((f) => f.trim()),
      images: imageUrls,
    };

    if (editingProject) {
      const { error } = await supabase
        .from('projects')
        .update(projectData)
        .eq('id', editingProject.id);
      if (error) {
        console.error('Error updating project:', error);
      } else {
        setProjects(projects.map((p) => (p.id === editingProject.id ? { ...p, ...projectData } : p)));
        setEditingProject(null);
        alert('Project updated!');
      }
    } else {
      const { error } = await supabase.from('projects').insert(projectData);
      if (error) {
        console.error('Error adding project:', error);
      } else {
        setProjects([...projects, projectData]);
        alert('Project added!');
      }
    }

    setFormData({
      id: '',
      title: '',
      category: '',
      client: '',
      location: '',
      completion_date: '',
      description: '',
      challenge: '',
      solution: '',
      features: '',
      images: [],
    });
  };

  // Handle edit button click
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
      features: project.features.join('\n'),
      images: [],
    });
  };

  // Handle delete button click
  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) {
        console.error('Error deleting project:', error);
      } else {
        setProjects(projects.filter((p) => p.id !== id));
        alert('Project deleted!');
      }
    }
  };

  // Handle logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  return (
    <div className="pt-16 pb-16 bg-secondary-50 min-h-screen">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-secondary-900">
            {editingProject ? 'Edit Project' : 'Add New Project'}
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Form for adding/editing projects */}
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md mb-12">
          <div>
            <label className="block text-sm font-medium text-secondary-700">ID</label>
            <input
              type="text"
              value={formData.id}
              onChange={(e) => setFormData({ ...formData, id: e.target.value })}
              className="w-full p-3 border rounded-lg border-secondary-200 focus:outline-none focus:ring-2 focus:ring-primary-400"
              required
              disabled={!!editingProject}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary-700">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-3 border rounded-lg border-secondary-200 focus:outline-none focus:ring-2 focus:ring-primary-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary-700">Category</label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full p-3 border rounded-lg border-secondary-200 focus:outline-none focus:ring-2 focus:ring-primary-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary-700">Client</label>
            <input
              type="text"
              value={formData.client}
              onChange={(e) => setFormData({ ...formData, client: e.target.value })}
              className="w-full p-3 border rounded-lg border-secondary-200 focus:outline-none focus:ring-2 focus:ring-primary-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary-700">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full p-3 border rounded-lg border-secondary-200 focus:outline-none focus:ring-2 focus:ring-primary-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary-700">Completion Date</label>
            <input
              type="text"
              value={formData.completion_date}
              onChange={(e) => setFormData({ ...formData, completion_date: e.target.value })}
              className="w-full p-3 border rounded-lg border-secondary-200 focus:outline-none focus:ring-2 focus:ring-primary-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary-700">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-3 border rounded-lg border-secondary-200 focus:outline-none focus:ring-2 focus:ring-primary-400"
              required
              rows={4}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary-700">Challenge</label>
            <textarea
              value={formData.challenge}
              onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
              className="w-full p-3 border rounded-lg border-secondary-200 focus:outline-none focus:ring-2 focus:ring-primary-400"
              required
              rows={4}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary-700">Solution</label>
            <textarea
              value={formData.solution}
              onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
              className="w-full p-3 border rounded-lg border-secondary-200 focus:outline-none focus:ring-2 focus:ring-primary-400"
              required
              rows={4}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary-700">Features (one per line)</label>
            <textarea
              value={formData.features}
              onChange={(e) => setFormData({ ...formData, features: e.target.value })}
              className="w-full p-3 border rounded-lg border-secondary-200 focus:outline-none focus:ring-2 focus:ring-primary-400"
              placeholder="Feature 1\nFeature 2\nFeature 3"
              required
              rows={4}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary-700">Images</label>
            <input
              type="file"
              multiple
              onChange={(e) => setFormData({ ...formData, images: Array.from(e.target.files || []) })}
              className="w-full p-3 border rounded-lg border-secondary-200"
              accept="image/*"
            />
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
            >
              {editingProject ? 'Update Project' : 'Add Project'}
            </button>
            {editingProject && (
              <button
                type="button"
                onClick={() => {
                  setEditingProject(null);
                  setFormData({
                    id: '',
                    title: '',
                    category: '',
                    client: '',
                    location: '',
                    completion_date: '',
                    description: '',
                    challenge: '',
                    solution: '',
                    features: '',
                    images: [],
                  });
                }}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>

        {/* List of existing projects */}
        <h2 className="text-3xl font-bold mb-6 text-secondary-900">Existing Projects</h2>
        <div className="space-y-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="p-6 border rounded-lg bg-white shadow-md flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-semibold text-secondary-900">{project.title}</h3>
                <p className="text-sm text-secondary-600">{project.category}</p>
              </div>
              <div className="space-x-3">
                <button
                  onClick={() => handleEdit(project)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;