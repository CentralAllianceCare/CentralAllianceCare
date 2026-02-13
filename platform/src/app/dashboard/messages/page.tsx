'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'

interface User {
  id: string
  name?: string
  email: string
  role: string
}

interface Message {
  id: string
  content: string
  senderId: string
  receiverId: string
  createdAt: string
  read: boolean
  sender: User
  receiver: User
}

interface Conversation {
  user: User
  lastMessage?: Message
  unreadCount: number
}

export default function MessagesPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConversation, setSelectedConversation] = useState<User | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState<User[]>([])
  const [showNewChatModal, setShowNewChatModal] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login')
    if (session) {
      loadConversations()
      loadUsers()
    }
  }, [status, session, router])

  useEffect(() => {
    if (selectedConversation) {
      loadMessages(selectedConversation.id)
    }
  }, [selectedConversation])

  // Poll for new messages every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (selectedConversation) {
        loadMessages(selectedConversation.id)
      }
      loadConversations()
    }, 3000)

    return () => clearInterval(interval)
  }, [selectedConversation])

  const loadConversations = async () => {
    try {
      const res = await fetch('/api/messages/conversations')
      if (res.ok) {
        const data = await res.json()
        setConversations(data.conversations)
      }
    } catch (error) {
      console.error('Error loading conversations:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadUsers = async () => {
    try {
      const res = await fetch('/api/users')
      if (res.ok) {
        const data = await res.json()
        setUsers(data.users)
      }
    } catch (error) {
      console.error('Error loading users:', error)
    }
  }

  const loadMessages = async (userId: string) => {
    try {
      const res = await fetch(`/api/messages?userId=${userId}`)
      if (res.ok) {
        const data = await res.json()
        setMessages(data.messages)
        // Mark messages as read
        await markMessagesAsRead(userId)
      }
    } catch (error) {
      console.error('Error loading messages:', error)
    }
  }

  const markMessagesAsRead = async (userId: string) => {
    try {
      await fetch('/api/messages/read', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      })
    } catch (error) {
      console.error('Error marking messages as read:', error)
    }
  }

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !selectedConversation) return

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          receiverId: selectedConversation.id,
          content: newMessage.trim()
        })
      })

      if (res.ok) {
        setNewMessage('')
        loadMessages(selectedConversation.id)
        loadConversations()
      }
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  const startNewChat = (user: User) => {
    setSelectedConversation(user)
    setShowNewChatModal(false)
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-400 text-lg">Loading...</div>
      </div>
    )
  }

  if (!session) return null

  const user = session.user as any

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-[#1a1a2e] text-white px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="text-[#C8A951] font-bold text-xl">Central Alliance Care</Link>
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="hover:text-[#C8A951] transition">Dashboard</Link>
              <Link href="/dashboard/profile" className="hover:text-[#C8A951] transition">Profile</Link>
              <Link href="/dashboard/messages" className="text-[#C8A951] font-medium">Messages</Link>
              <Link href="/dashboard/video" className="hover:text-[#C8A951] transition">Video Call</Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="bg-[#00563F] px-3 py-1 rounded-full text-xs font-medium capitalize">{user.role}</span>
            <span className="text-white/70 text-sm">{user.name || user.email}</span>
            <button
              onClick={() => router.push('/api/auth/signout')}
              className="bg-white/10 hover:bg-[#C8A951] px-4 py-2 rounded-lg text-sm transition"
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden" style={{ height: '600px' }}>
          <div className="flex h-full">
            {/* Conversations Sidebar */}
            <div className="w-1/3 border-r border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-[#1a1a2e]">Messages</h2>
                  <button
                    onClick={() => setShowNewChatModal(true)}
                    className="bg-[#00563F] text-white p-2 rounded-lg hover:bg-[#C8A951] transition"
                    title="New Chat"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="overflow-y-auto" style={{ height: 'calc(100% - 100px)' }}>
                {conversations.length === 0 ? (
                  <div className="p-6 text-center text-gray-500">
                    <div className="text-4xl mb-4">💬</div>
                    <p className="text-sm">No conversations yet</p>
                    <button
                      onClick={() => setShowNewChatModal(true)}
                      className="mt-4 bg-[#00563F] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#C8A951] transition"
                    >
                      Start a conversation
                    </button>
                  </div>
                ) : (
                  conversations.map((conv) => (
                    <div
                      key={conv.user.id}
                      onClick={() => setSelectedConversation(conv.user)}
                      className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition ${
                        selectedConversation?.id === conv.user.id ? 'bg-blue-50 border-blue-200' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#00563F] rounded-full flex items-center justify-center text-white text-sm font-medium">
                          {conv.user.name?.[0] || conv.user.email[0].toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-gray-900 truncate">
                              {conv.user.name || conv.user.email}
                            </h3>
                            {conv.unreadCount > 0 && (
                              <span className="bg-[#C8A951] text-white text-xs px-2 py-1 rounded-full">
                                {conv.unreadCount}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-[#00563F] bg-green-100 px-2 py-0.5 rounded-full capitalize">
                              {conv.user.role}
                            </span>
                            {conv.lastMessage && (
                              <span className="text-xs text-gray-400">
                                {new Date(conv.lastMessage.createdAt).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                          {conv.lastMessage && (
                            <p className="text-sm text-gray-500 truncate mt-1">
                              {conv.lastMessage.content}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              {selectedConversation ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-200 bg-gray-50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#00563F] rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {selectedConversation.name?.[0] || selectedConversation.email[0].toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {selectedConversation.name || selectedConversation.email}
                        </h3>
                        <span className="text-xs text-[#00563F] bg-green-100 px-2 py-0.5 rounded-full capitalize">
                          {selectedConversation.role}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => {
                      const isOwnMessage = message.senderId === user.id
                      return (
                        <div
                          key={message.id}
                          className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                              isOwnMessage
                                ? 'bg-[#00563F] text-white'
                                : 'bg-gray-100 text-gray-900'
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <p
                              className={`text-xs mt-1 ${
                                isOwnMessage ? 'text-white/70' : 'text-gray-500'
                              }`}
                            >
                              {new Date(message.createdAt).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {/* Message Input */}
                  <form onSubmit={sendMessage} className="p-4 border-t border-gray-200 bg-gray-50">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#00563F]"
                      />
                      <button
                        type="submit"
                        disabled={!newMessage.trim()}
                        className="bg-[#00563F] text-white px-6 py-2 rounded-lg hover:bg-[#C8A951] transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Send
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <div className="text-6xl mb-4">💬</div>
                    <h3 className="text-lg font-medium mb-2">Select a conversation</h3>
                    <p className="text-sm">Choose a conversation to start messaging</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* New Chat Modal */}
      {showNewChatModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#1a1a2e]">Start New Chat</h3>
              <button
                onClick={() => setShowNewChatModal(false)}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="max-h-64 overflow-y-auto">
              {users.filter(u => u.id !== user.id).map((u) => (
                <div
                  key={u.id}
                  onClick={() => startNewChat(u)}
                  className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer flex items-center gap-3 border-b border-gray-100 last:border-b-0"
                >
                  <div className="w-10 h-10 bg-[#00563F] rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {u.name?.[0] || u.email[0].toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{u.name || u.email}</h4>
                    <span className="text-xs text-[#00563F] bg-green-100 px-2 py-0.5 rounded-full capitalize">
                      {u.role}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}