import React, { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FiMail, FiX, FiSend, FiTrash2, FiUser } from 'react-icons/fi';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const MessageCenter = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState('');

  const { data: messages = [], refetch } = useQuery({
    queryKey: ['messages', user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get(`/api/messages/${user.email}`);
      return res.data.data || [];
    },
    enabled: !!user?.email,
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  const markAsReadMutation = useMutation({
    mutationFn: async (messageId) => {
      await axiosSecure.patch(`/api/messages/${messageId}/read`);
    },
    onSuccess: () => {
      refetch();
    },
  });

  const deleteMessageMutation = useMutation({
    mutationFn: async (messageId) => {
      await axiosSecure.delete(`/api/messages/${messageId}`);
    },
    onSuccess: () => {
      toast.success('Message deleted');
      refetch();
      if (selectedMessage?._id === messages.find(m => m._id === selectedMessage?._id)?._id) {
        setSelectedMessage(null);
      }
    },
    onError: () => {
      toast.error('Failed to delete message');
    },
  });

  const sendReplyMutation = useMutation({
    mutationFn: async ({ messageId, reply }) => {
      await axiosSecure.post(`/api/messages/${messageId}/reply`, { reply });
    },
    onSuccess: () => {
      toast.success('Reply sent');
      setReplyText('');
      refetch();
    },
    onError: () => {
      toast.error('Failed to send reply');
    },
  });

  useEffect(() => {
    if (messages.length > 0) {
      const unread = messages.filter((m) => !m.read).length;
      setUnreadCount(unread);
    } else {
      setUnreadCount(0);
    }
  }, [messages]);

  const messageContentRef = useRef(null);

  useEffect(() => {
    if (isOpen && messageContentRef.current) {
      messageContentRef.current.scrollTop = messageContentRef.current.scrollHeight;
    }
  }, [isOpen, selectedMessage, messages]);

  const handleMessageClick = (message) => {
    setSelectedMessage(message);
    if (!message.read) {
      markAsReadMutation.mutate(message._id);
    }
  };

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedMessage) return;
    sendReplyMutation.mutate({ messageId: selectedMessage._id, reply: replyText });
  };

  const handleDeleteMessage = (messageId, e) => {
    e.stopPropagation();
    Swal.fire({
      title: 'Delete Message?',
      text: 'Are you sure you want to delete this message? This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, Delete',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMessageMutation.mutate(messageId);
      }
    });
  };

  const formatDate = (date) => {
    const now = new Date();
    const messageDate = new Date(date);
    const diffInHours = (now - messageDate) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return messageDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return messageDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const messageRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (messageRef.current && !messageRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={messageRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-9 h-9 rounded-lg bg-[#f4f6f8] hover:bg-gray-200 flex items-center justify-center transition-colors"
        aria-label="Messages"
      >
        <FiMail className="text-[#242424] text-lg" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center font-['Satoshi']">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="absolute right-0 top-12 w-80 md:w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 max-h-[600px] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-bold text-lg text-[#242424] font-['Satoshi']">
                Messages
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close"
              >
                <FiX className="text-gray-500" size={18} />
              </button>
            </div>

            {!selectedMessage ? (
              /* Messages List */
              <div className="overflow-y-auto flex-1">
                {messages.length === 0 ? (
                  <div className="p-8 text-center text-gray-500 font-['Satoshi']">
                    <FiMail size={48} className="mx-auto mb-4 text-gray-300" />
                    <p>No messages yet</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {messages.map((message) => (
                      <div
                        key={message._id}
                        className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                          !message.read ? 'bg-blue-50' : ''
                        }`}
                        onClick={() => handleMessageClick(message)}
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#238ae9] to-[#1e7acc] flex items-center justify-center shrink-0">
                            <FiUser className="text-white" size={18} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <p className="font-semibold text-sm text-[#242424] font-['Satoshi'] truncate">
                                {message.senderName || 'System'}
                              </p>
                              <span className="text-xs text-gray-400 font-['Satoshi'] shrink-0 ml-2">
                                {formatDate(message.createdAt)}
                              </span>
                            </div>
                            <p className="text-xs text-gray-600 font-['Satoshi'] line-clamp-2">
                              {message.subject || message.message}
                            </p>
                            {!message.read && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                            )}
                          </div>
                          <button
                            onClick={(e) => handleDeleteMessage(message._id, e)}
                            className="p-1 hover:bg-red-50 rounded transition-colors shrink-0"
                            aria-label="Delete message"
                          >
                            <FiTrash2 className="text-red-500" size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              /* Message Detail View */
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedMessage(null)}
                    className="text-sm text-[#238ae9] hover:underline font-['Satoshi']"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={(e) => handleDeleteMessage(selectedMessage._id, e)}
                    className="p-1 hover:bg-red-50 rounded transition-colors"
                    aria-label="Delete message"
                  >
                    <FiTrash2 className="text-red-500" size={16} />
                  </button>
                </div>

                <div ref={messageContentRef} className="flex-1 overflow-y-auto p-4 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#238ae9] to-[#1e7acc] flex items-center justify-center">
                        <FiUser className="text-white" size={14} />
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-[#242424] font-['Satoshi']">
                          {selectedMessage.senderName || 'System'}
                        </p>
                        <p className="text-xs text-gray-500 font-['Satoshi']">
                          {new Date(selectedMessage.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="font-semibold text-sm text-[#242424] font-['Satoshi'] mb-2">
                        {selectedMessage.subject || 'No Subject'}
                      </p>
                      <p className="text-sm text-gray-700 font-['Satoshi'] whitespace-pre-wrap">
                        {selectedMessage.message}
                      </p>
                    </div>
                  </div>

                  {selectedMessage.replies && selectedMessage.replies.length > 0 && (
                    <div className="space-y-3 pt-4 border-t border-gray-200">
                      <p className="text-xs font-semibold text-gray-500 font-['Satoshi']">Replies:</p>
                      {selectedMessage.replies.map((reply, index) => (
                        <div key={index} className="bg-blue-50 rounded-lg p-3">
                          <p className="text-xs text-gray-600 font-['Satoshi'] mb-1">
                            {reply.senderName || 'You'} • {formatDate(reply.createdAt)}
                          </p>
                          <p className="text-sm text-gray-700 font-['Satoshi'] whitespace-pre-wrap">
                            {reply.message}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Reply Form */}
                <form onSubmit={handleSendReply} className="p-4 border-t border-gray-200">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Type a reply..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-['Satoshi'] focus:outline-none focus:ring-2 focus:ring-[#238ae9]"
                    />
                    <button
                      type="submit"
                      disabled={!replyText.trim() || sendReplyMutation.isPending}
                      className="px-4 py-2 bg-[#238ae9] text-white rounded-lg hover:bg-[#1e7acc] transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-['Satoshi']"
                    >
                      <FiSend size={16} />
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MessageCenter;

