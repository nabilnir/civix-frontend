import React from 'react';
import { FiMail, FiPhone, FiCalendar, FiEdit2, FiTrash2, FiUser } from 'react-icons/fi';
import Avatar from '../../Shared/Avatar';
import Badge from '../../Shared/Badge';
import EmptyState from '../../Shared/EmptyState';

const StaffTable = ({
  staff = [],
  isLoading = false,
  onEdit,
  onDelete,
}) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#238ae9]"></div>
      </div>
    );
  }

  if (staff.length === 0) {
    return (
      <EmptyState
        message="No staff members found"
        description="Add your first staff member to get started."
      />
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider font-['Satoshi']">
              Staff Member
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider font-['Satoshi']">
              Contact
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider font-['Satoshi']">
              Department
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider font-['Satoshi']">
              Assigned Issues
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider font-['Satoshi']">
              Joined
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider font-['Satoshi']">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {staff.map((member) => (
            <tr key={member._id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-3">
                  <Avatar
                    src={member.photoURL}
                    name={member.name}
                    size="md"
                  />
                  <div>
                    <p className="font-['Satoshi'] font-semibold text-sm text-[#242424]">
                      {member.name || 'N/A'}
                    </p>
                    <p className="font-['Satoshi'] text-xs text-gray-500">
                      Staff ID: {member.staffId || 'N/A'}
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <FiMail className="text-gray-400" size={14} />
                    <span className="font-['Satoshi'] text-sm text-gray-600">
                      {member.email}
                    </span>
                  </div>
                  {member.phone && (
                    <div className="flex items-center gap-2">
                      <FiPhone className="text-gray-400" size={14} />
                      <span className="font-['Satoshi'] text-sm text-gray-600">
                        {member.phone}
                      </span>
                    </div>
                  )}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {member.department ? (
                  <Badge variant="info" size="sm">
                    {member.department}
                  </Badge>
                ) : (
                  <span className="text-gray-400 text-sm font-['Satoshi']">N/A</span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="font-['Satoshi'] text-sm text-[#242424] font-semibold">
                  {member.assignedIssuesCount || 0}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <FiCalendar className="text-gray-400" size={14} />
                  <span className="font-['Satoshi'] text-sm text-gray-600">
                    {member.createdAt
                      ? new Date(member.createdAt).toLocaleDateString()
                      : 'N/A'}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onEdit && onEdit(member)}
                    className="p-2 text-[#238ae9] hover:bg-blue-50 rounded-lg transition-colors"
                    aria-label="Edit staff"
                  >
                    <FiEdit2 size={16} />
                  </button>
                  <button
                    onClick={() => onDelete && onDelete(member)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    aria-label="Delete staff"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StaffTable;

