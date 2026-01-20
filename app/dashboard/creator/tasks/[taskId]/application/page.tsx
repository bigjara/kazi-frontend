'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { X, Users, Download, Mail, Phone, MapPin, Calendar } from 'lucide-react';

// Mock data - replace with actual API call
const mockApplications = [
  {
    id: 'APP-001',
    name: 'Chioma Adeyemi',
    email: 'chioma.ade@gmail.com',
    phone: '+234 803 456 7890',
    location: 'Lagos, Nigeria',
    appliedDate: '2025-11-15',
    status: 'reviewed',
    hasCV: true,
  },
  {
    id: 'APP-002',
    name: 'Tunde Peters',
    email: 'tu.ade@gmail.com',
    phone: '+234 803 456 7890',
    location: 'Lagos, Nigeria',
    appliedDate: '2025-11-15',
    status: 'pending',
    hasCV: true,
  },
  {
    id: 'APP-003',
    name: 'Chioma Okonkwo',
    email: 'chioma.okon@gmail.com',
    phone: '+234 803 456 7890',
    location: 'Lagos, Nigeria',
    appliedDate: '2025-11-15',
    status: 'accepted',
    hasCV: true,
  },
  {
    id: 'APP-004',
    name: 'Micheal Adeyemi',
    email: 'chioma.ade@gmail.com',
    phone: '+234 803 456 7890',
    location: 'Lagos, Nigeria',
    appliedDate: '2025-11-15',
    status: 'rejected',
    hasCV: true,
  },
];



export default function ApplicationsPage() {
  const router = useRouter();
  const params = useParams();
  const taskId = params.taskId as string;
  
  const [activeFilter, setActiveFilter] = useState('all');
  const [applications] = useState(mockApplications);

  const filteredApplications = activeFilter === 'all' 
    ? applications 
    : applications.filter(app => app.status === activeFilter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'reviewed':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'accepted':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'rejected':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const handleViewApplicant = (applicationId: string) => {
    router.push(`/tasks/${taskId}/application/${applicationId}`);
  };

  const handleClose = () => {
    router.push('/dashboard/creator');
  };

  const counts = {
  all: applications.length,
  pending: applications.filter(a => a.status === 'pending').length,
  reviewed: applications.filter(a => a.status === 'reviewed').length,
  accepted: applications.filter(a => a.status === 'accepted').length,
  rejected: applications.filter(a => a.status === 'rejected').length,
};

const dynamicFilterTabs = [
  { id: 'all', label: 'All', count: counts.all },
  { id: 'pending', label: 'Pending', count: counts.pending },
  { id: 'reviewed', label: 'Reviewed', count: counts.reviewed },
  { id: 'accepted', label: 'Accepted', count: counts.accepted },
  { id: 'rejected', label: 'Rejected', count: counts.rejected },
];
  return (
    <div className="min-h-screen bg-gray-100/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl p-8 relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Users size={28} className="text-gray-700" />
            <h1 className="text-2xl font-bold text-gray-900">Applications</h1>
          </div>
          <p className="text-gray-600">Senior Software Engineer</p>
        </div>

        <div className="border-t border-gray-200 pt-6">
          {/* Filter Tabs */}
          <div className="flex items-center gap-2 mb-6 overflow-x-auto">
            {dynamicFilterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${
                  activeFilter === tab.id
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>

          {/* Applications List */}
          <div className="space-y-4">
            {filteredApplications.map((application) => (
              <div
                key={application.id}
                onClick={() => handleViewApplicant(application.id)}
                className="border border-gray-200 rounded-xl p-5 hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {application.name}
                  </h3>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(application.status)}`}>
                      {getStatusText(application.status)}
                    </span>
                    {application.hasCV && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle CV download
                        }}
                        className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-md px-2 py-1"
                      >
                        <Download size={14} />
                        CV
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Mail size={16} />
                    <span>{application.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={16} />
                    <span>{application.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    <span>{application.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>{application.appliedDate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredApplications.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No applications found for this filter.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}