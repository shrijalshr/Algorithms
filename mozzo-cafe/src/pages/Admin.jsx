import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { mockMenuItems } from '../lib/mockData';
import Button from '../components/Button';
import { Trash2, Edit2, Save, LogOut } from 'lucide-react';
import { motion as Motion, AnimatePresence } from 'framer-motion';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image_url: '',
    available: true
  });

  const fetchItems = useCallback(async () => {
    await Promise.resolve(); // Avoid synchronous setState warning in useEffect
    setLoading(true);
    if (supabase) {
      const { data, error } = await supabase.from('menu_items').select('*').order('id');
      if (error) {
        console.error("Error fetching items:", error);
        setItems(mockMenuItems);
      } else {
        setItems(data);
      }
    } else {
      setItems(mockMenuItems);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setIsAuthenticated(!!session);
      });

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setIsAuthenticated(!!session);
      });

      return () => subscription.unsubscribe();
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      // Use setTimeout to avoid synchronous setState warning in effect
      setTimeout(() => {
        fetchItems();
      }, 0);
    }
  }, [isAuthenticated, fetchItems]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (supabase) {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        alert(error.message);
      }
      // state update handled by onAuthStateChange
    } else {
      // Mock Login
      if (email === 'admin@mozzo.com' && password === 'admin') {
        setIsAuthenticated(true);
      } else {
        alert("Supabase not configured. Use admin@mozzo.com / admin");
      }
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    setIsAuthenticated(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    if (supabase) {
      const { error } = await supabase.from('menu_items').delete().eq('id', id);
      if (error) {
        alert("Error deleting item: " + error.message);
      } else {
        fetchItems();
      }
    } else {
      setItems(prevItems => prevItems.filter(item => item.id !== id));
      alert("Deleted from local state (Mock Mode)");
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData(item);
  };

  const handleCancel = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
      image_url: '',
      available: true
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (supabase) {
      if (editingItem && editingItem.id) {
        // Update
        const { error } = await supabase
          .from('menu_items')
          .update(formData)
          .eq('id', editingItem.id);

        if (error) {
           alert("Error updating item: " + error.message);
        } else {
           fetchItems();
           handleCancel();
        }
      } else {
        // Insert
        const { error } = await supabase
          .from('menu_items')
          .insert([formData]);

        if (error) {
          alert("Error adding item: " + error.message);
        } else {
          fetchItems();
          handleCancel();
        }
      }
    } else {
      // Mock update
      if (editingItem && editingItem.id) {
         setItems(prevItems => prevItems.map(i => i.id === editingItem.id ? { ...formData, id: i.id } : i));
      } else {
         setItems(prevItems => [...prevItems, { ...formData, id: Date.now() }]);
      }
      alert("Saved to local state (Mock Mode)");
      handleCancel();
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F5F2] px-4">
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm"
        >
          <h2 className="text-3xl font-bold text-[#4A3B32] mb-2 text-center">Admin Access</h2>
          <p className="text-center text-gray-500 mb-6">Sign in to manage your menu</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@mozzo.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8A97E]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8A97E]"
              />
            </div>
            <Button type="submit" className="w-full justify-center cursor-pointer" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </Motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F5F2] p-8 pb-20 pt-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
             <h1 className="text-3xl font-bold text-[#4A3B32]">Menu Management</h1>
             <p className="text-gray-500 text-sm mt-1">Manage your cafe&apos;s offerings</p>
          </div>
          <div className="flex gap-4">
            <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2 cursor-pointer">
              <LogOut size={18} /> Logout
            </Button>
            {editingItem && (
               <Button onClick={handleCancel} variant="primary" className="cursor-pointer">
                  Cancel Edit
               </Button>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <Motion.div
               layout
               className="bg-white p-6 rounded-2xl shadow-lg sticky top-24"
            >
              <h2 className="text-xl font-bold mb-4 text-[#4A3B32]">
                {editingItem ? 'Edit Item' : 'Add New Item'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8A97E]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8A97E]"
                    rows="3"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                    <input
                      type="number"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8A97E]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <input
                      type="text"
                      required
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8A97E]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <input
                    type="url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8A97E]"
                  />
                </div>
                <div className="flex items-center space-x-2">
                   <input
                    type="checkbox"
                    checked={formData.available}
                    onChange={(e) => setFormData({...formData, available: e.target.checked})}
                    className="w-4 h-4 text-[#4A3B32] border-gray-300 rounded focus:ring-[#4A3B32]"
                   />
                   <label className="text-sm font-medium text-gray-700">Available</label>
                </div>

                <div className="flex gap-2 pt-4">
                   <Button type="submit" className="w-full flex justify-center items-center gap-2 cursor-pointer">
                     <Save size={18} /> {editingItem ? 'Update' : 'Save'}
                   </Button>
                </div>
              </form>
            </Motion.div>
          </div>

          {/* List Section */}
          <div className="lg:col-span-2 space-y-4 order-1 lg:order-2">
            <AnimatePresence>
            {loading ? <p>Loading...</p> : items.map((item) => (
              <Motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between group hover:shadow-md transition-shadow border border-transparent hover:border-[#C8A97E]/30"
              >
                <div className="flex items-center space-x-4 overflow-hidden">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    {item.image_url ? (
                        <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-200">?</div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-[#4A3B32] truncate">{item.name}</h3>
                    <p className="text-sm text-gray-500 truncate">{item.category} • ₹{item.price}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${item.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {item.available ? 'Available' : 'Sold Out'}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleEdit(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-full cursor-pointer" title="Edit">
                    <Edit2 size={18} />
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-full cursor-pointer" title="Delete">
                    <Trash2 size={18} />
                  </button>
                </div>
              </Motion.div>
            ))}
            </AnimatePresence>
            {items.length === 0 && !loading && (
                <div className="text-center py-10 text-gray-500">
                    No items found. Add one to get started!
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
