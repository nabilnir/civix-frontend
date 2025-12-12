import React from 'react';
import { FiUser, FiMail, FiCalendar, FiLock, FiUnlock } from 'react-icons/fi';
import Avatar from '../../Shared/Avatar';
import Badge from '../../Shared/Badge';
import BlockUserButton from './BlockUserButton';

const UserTable = ({ users = [], isLoading = false, onUserUpdate }) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#238ae9]"></div>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 font-['Satoshi']">
        No users found
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider font-['Satoshi']">
              User
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider font-['Satoshi']">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider font-['Satoshi']">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider font-['Satoshi']">
              Subscription
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
          {users.map((user) => (
            <tr key={user._id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-3">
                  <Avatar
                    src={user.photoURL}
                    name={user.name}
                    size="md"
                    status={user.isBlocked ? 'offline' : 'online'}
                  />
                  <div>
                    <p className="font-['Satoshi'] font-semibold text-sm text-[#242424]">
                      {user.name || 'N/A'}
                    </p>
                    <p className="font-['Satoshi'] text-xs text-gray-500">
                      {user.role || 'citizen'}
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <FiMail className="text-gray-400" size={14} />
                  <span className="font-['Satoshi'] text-sm text-gray-600">
                    {user.email}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {user.isBlocked ? (
                  <Badge variant="danger" size="sm">
                    <FiLock size={12} className="mr-1" />
                    Blocked
                  </Badge>
                ) : (
                  <Badge variant="success" size="sm">
                    <FiUnlock size={12} className="mr-1" />
                    Active
                  </Badge>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {user.isPremium ? (
                  <Badge variant="warning" size="sm">
                    👑 Premium
                  </Badge>
                ) : (
                  <Badge variant="default" size="sm">
                    Free
                  </Badge>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <FiCalendar className="text-gray-400" size={14} />
                  <span className="font-['Satoshi'] text-sm text-gray-600">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : 'N/A'}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <BlockUserButton
                  user={user}
                  onUpdate={onUserUpdate}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;

