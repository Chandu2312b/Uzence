import React, { useState } from 'react';
import InputField from './InputField';
import DataTable, { Column } from './DataTable';
import { User, Mail, Phone, MapPin, Calendar, Star, ShoppingBag, DollarSign } from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: string;
  joinDate: string;
  status: 'Active' | 'Inactive' | 'Pending';
  orders: number;
  totalSpent: number;
  rating: number;
}

const ComponentDemo: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    website: '',
    age: '',
    bio: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Sample data for DataTable
  const userData: User[] = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '+1 (555) 123-4567',
      location: 'New York, NY',
      joinDate: '2024-01-15',
      status: 'Active',
      orders: 12,
      totalSpent: 2450.50,
      rating: 4.8,
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      phone: '+1 (555) 987-6543',
      location: 'Los Angeles, CA',
      joinDate: '2024-02-20',
      status: 'Active',
      orders: 8,
      totalSpent: 1820.75,
      rating: 4.6,
    },
    {
      id: 3,
      name: 'Mike Davis',
      email: 'mike.davis@example.com',
      phone: '+1 (555) 456-7890',
      location: 'Chicago, IL',
      joinDate: '2024-03-10',
      status: 'Inactive',
      orders: 15,
      totalSpent: 3200.25,
      rating: 4.9,
    },
    {
      id: 4,
      name: 'Emily Wilson',
      email: 'emily.wilson@example.com',
      phone: '+1 (555) 321-0987',
      location: 'Houston, TX',
      joinDate: '2024-03-25',
      status: 'Pending',
      orders: 3,
      totalSpent: 450.00,
      rating: 4.2,
    },
    {
      id: 5,
      name: 'David Brown',
      email: 'david.brown@example.com',
      phone: '+1 (555) 654-3210',
      location: 'Phoenix, AZ',
      joinDate: '2024-04-05',
      status: 'Active',
      orders: 22,
      totalSpent: 4150.80,
      rating: 4.7,
    },
  ];

  const columns: Column[] = [
    {
      key: 'name',
      header: 'Customer',
      sortable: true,
      render: (value: string, row: User) => (
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
            {value.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <div className="font-semibold text-gray-900">{value}</div>
            <div className="text-sm text-gray-500">{row.email}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'phone',
      header: 'Phone',
      sortable: true,
      render: (value: string) => (
        <div className="flex items-center space-x-2">
          <Phone size={16} className="text-gray-400" />
          <span>{value}</span>
        </div>
      ),
    },
    {
      key: 'location',
      header: 'Location',
      sortable: true,
      render: (value: string) => (
        <div className="flex items-center space-x-2">
          <MapPin size={16} className="text-gray-400" />
          <span>{value}</span>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (value: string) => (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
          value === 'Active' ? 'bg-green-100 text-green-800' :
          value === 'Inactive' ? 'bg-red-100 text-red-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {value}
        </span>
      ),
    },
    {
      key: 'orders',
      header: 'Orders',
      sortable: true,
      align: 'center' as const,
      render: (value: number) => (
        <div className="flex items-center justify-center space-x-2">
          <ShoppingBag size={16} className="text-gray-400" />
          <span className="font-semibold">{value}</span>
        </div>
      ),
    },
    {
      key: 'totalSpent',
      header: 'Total Spent',
      sortable: true,
      align: 'right' as const,
      render: (value: number) => (
        <div className="flex items-center justify-end space-x-2">
          <DollarSign size={16} className="text-green-500" />
          <span className="font-semibold">${value.toLocaleString()}</span>
        </div>
      ),
    },
    {
      key: 'rating',
      header: 'Rating',
      sortable: true,
      align: 'center' as const,
      render: (value: number) => (
        <div className="flex items-center justify-center space-x-1">
          <Star size={16} className="text-yellow-400 fill-current" />
          <span className="font-semibold">{value}</span>
        </div>
      ),
    },
  ];

  const handleInputChange = (field: string) => (value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors: Record<string, string> = {};
    
    if (!formData.firstName) errors.firstName = 'First name is required';
    if (!formData.lastName) errors.lastName = 'Last name is required';
    if (!formData.email) errors.email = 'Email is required';
    if (!formData.password) errors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    setFormErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      alert('Form submitted successfully!');
      console.log('Form data:', formData);
    }
  };

  const handleUserAction = (action: string) => (user: User) => {
    alert(`${action} action for user: ${user.name}`);
    console.log(`${action} user:`, user);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            React Component Development Assignment
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Demonstrating two powerful React components: InputField with comprehensive validation 
            and DataTable with advanced features for data management.
          </p>
        </div>

        {/* InputField Demo */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <User className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">InputField Component</h2>
                <p className="text-gray-600">Advanced form inputs with validation, error handling, and accessibility</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="First Name"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={handleInputChange('firstName')}
                  error={formErrors.firstName}
                  required
                  maxLength={50}
                />
                
                <InputField
                  label="Last Name"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={handleInputChange('lastName')}
                  error={formErrors.lastName}
                  required
                  maxLength={50}
                />
              </div>

              <InputField
                label="Email Address"
                type="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleInputChange('email')}
                error={formErrors.email}
                required
                helperText="We'll use this to send you important updates"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange('password')}
                  error={formErrors.password}
                  required
                  minLength={8}
                  validation={{
                    custom: (value) => {
                      if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
                        return 'Password must contain uppercase, lowercase, and number';
                      }
                      return null;
                    }
                  }}
                />
                
                <InputField
                  label="Confirm Password"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange('confirmPassword')}
                  error={formErrors.confirmPassword}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="Phone Number"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone}
                  onChange={handleInputChange('phone')}
                  helperText="Optional: Include country code"
                />
                
                <InputField
                  label="Website"
                  type="url"
                  placeholder="https://your-website.com"
                  value={formData.website}
                  onChange={handleInputChange('website')}
                  helperText="Optional: Your personal or business website"
                />
              </div>

              <InputField
                label="Age"
                type="number"
                placeholder="Enter your age"
                value={formData.age}
                onChange={handleInputChange('age')}
                validation={{ min: 13, max: 120 }}
                helperText="Must be 13 years or older"
              />

              <InputField
                label="Bio"
                placeholder="Tell us about yourself..."
                value={formData.bio}
                onChange={handleInputChange('bio')}
                maxLength={500}
                helperText="Optional: Share a brief description about yourself"
              />

              <div className="pt-4">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-8 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  Submit Form
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* DataTable Demo */}
        <section>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center">
                <Mail className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">DataTable Component</h2>
                <p className="text-gray-600">Feature-rich data table with sorting, filtering, pagination, and actions</p>
              </div>
            </div>

            <DataTable
              data={userData}
              columns={columns}
              pageSize={10}
              searchable
              filterable
              exportable
              selectable
              actions={{
                view: handleUserAction('View'),
                edit: handleUserAction('Edit'),
                delete: handleUserAction('Delete'),
              }}
              onRowClick={(user) => {
                alert(`Clicked on user: ${user.name}`);
                console.log('Row clicked:', user);
              }}
              emptyMessage="No customers found matching your criteria"
            />
          </div>
        </section>

        {/* Documentation */}
        <section className="mt-16">
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Component Features</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center space-x-2">
                  <User size={20} className="text-blue-600" />
                  <span>InputField Component</span>
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Multiple input types (text, email, password, number, tel, url)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Real-time validation with custom validation functions</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Visual feedback with success/error states and icons</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Character count tracking and length restrictions</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Password visibility toggle and strength validation</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Accessibility features and keyboard navigation</span>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center space-x-2">
                  <Mail size={20} className="text-teal-600" />
                  <span>DataTable Component</span>
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Column sorting (ascending, descending, neutral)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Global search and per-column filtering</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Pagination with configurable page sizes</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Row selection (single and multiple)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Action buttons (view, edit, delete, custom)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>CSV export functionality and loading states</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ComponentDemo;