/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { FiSearch, FiPaperclip, FiSend, FiCamera } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const RequestStatus = () => {
  const [userImage, setUserImage] = useState("https://via.placeholder.com/80");
  const [showModal, setShowModal] = useState(false);
  const [userName, setUserName] = useState("John Doe");
  const [chatData, setChatData] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [typedMessage, setTypedMessage] = useState("");
const [attachedFile, setAttachedFile] = useState(null);
const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  const avatarImages = {
    male: [
      "https://res.cloudinary.com/dorttcm29/image/upload/v1731939908/male-avatar-portrait-of-a-young-man-with-a-beard-illustration-of-male-character-in-modern-color-style-vector-4067145648_gdnucu.jpg",
      "https://res.cloudinary.com/dorttcm29/image/upload/v1731939908/pngtree-man-avatar-isolated-png-image_9935818-2120792502_fupwgi.png",
      "https://res.cloudinary.com/dorttcm29/image/upload/v1731941476/2079979_jhihge.png",
    ],
    female: [
      "https://res.cloudinary.com/dorttcm29/image/upload/v1731939908/beautiful-woman-avatar-character-icon-free-vector-1316470041_ntzweu.jpg",
      "https://res.cloudinary.com/dorttcm29/image/upload/v1731939908/beautiful-woman-avatar-character-icon-free-vector-3045800833_yqctcq.jpg",
      "https://res.cloudinary.com/dorttcm29/image/upload/v1731941476/profile-picture-icon-12_eoaes4.png",
    ]
  };

  const handleCreateNewRequest = () => {
    navigate('/maintenance');
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5000000) { // Max size 5MB
        alert('File is too large');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserImage(reader.result);
        setShowModal(false);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle selecting an avatar
  const handleAvatarSelection = (avatarUrl) => {
    setUserImage(avatarUrl);
    setShowModal(false);
  };

  const handleChatSelection = (chatId) => {
    const selected = chatData.find(chat => chat.id === chatId);
    setSelectedChat(selected);
  };

  const logout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userDetails");
    navigate("/login");
  };

  const handleFileUpload = (file) => {
    if (file) {
      setAttachedFile(file);
      alert(`File "${file.name}" has been attached.`);
    }
  };
  
  const handleSendMessage = () => {
    if (!typedMessage && !attachedFile) {
      alert("Please type a message or attach a file.");
      return;
    }

    const message = {
        text: typedMessage,
        file: attachedFile ? attachedFile.name : null,
        timestamp: new Date().toLocaleString(),
      };
    
      console.log("Message sent:", message);
      // Add message to the chat window (pseudo-code):
       setMessages([...messages, message]);
    
      // Clear the input and file after sending
      setTypedMessage("");
      setAttachedFile(null);
    };
  const testChatData = [
    {
      id: 1,
      name: "Lucy Robin",
      message: "Hello! Finally found the time to write to you. I need your help in creating interactive animations for my mobile application.",
      lastActive: "1 minute ago",
      image: "https://via.placeholder.com/50",
    },
    {
      id: 2,
      name: "Jared Sunn",
      message: "Voice message",
      lastActive: "1 minute ago",
      image: "https://via.placeholder.com/50",
    },
    {
      id: 3,
      name: "Nika Jerrado",
      message: 'Request to fix the server down issue.',
      lastActive: "5 hours ago",
      image: "https://via.placeholder.com/50",
    },
    {
        id: 4,
        name: 'Jane Smith',
        image: 'https://via.placeholder.com/150', 
        message: 'Query about billing issues.',
        lastActive: '1 day ago',
      },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/chatData');
        if (!response.ok) throw new Error('Failed to fetch chat data');
        const data = await response.json();
        setChatData(data.length ? data : testChatData);
      } catch (error) {
        console.error('Error fetching chat data:', error);
        setChatData(testChatData);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-1/4 bg-white shadow-md p-4">
        <div className="text-center mb-8">
          {/* Profile Image Section */}
          <div className="relative">
            <img
              src={userImage}
              alt="Profile"
              className="rounded-full mx-auto mb-4 w-20 h-20"
            />
            <button
              className="absolute bottom-0 right-4 bg-blue-500 text-white p-1 rounded-full text-xs"
              onClick={() => setShowModal(true)}
            >
              <FiCamera />
            </button>
          </div>

          <h2 className="font-bold text-lg mt-4">{userName}</h2>
        </div>

        <nav className="flex flex-col space-y-4">
          <button
            className="text-gray-600 hover:text-blue-600 flex items-center space-x-2"
            onClick={() => (window.location.href = "/dashboard")}
          >
            <span>🏠</span> <span>Home</span>
          </button>
          <button
            className="text-gray-600 hover:text-blue-600 flex items-center space-x-2"
            onClick={() => (window.location.href = "/notifications")}
          >
            <span>🔔</span> <span>Notifications</span>
          </button>
          <button
            className="text-gray-600 hover:text-blue-600 flex items-center space-x-2"
            onClick={() => (window.location.href = "/contact")}
          >
            <span>📋</span> <span>Contact</span>
          </button>
        </nav>

        <button
          className="text-red-600 hover:text-red-800 mt-12"
          onClick={() => {
            logout();
            alert("You have been logged out");
          }}
        >
          Log Out
        </button>
      </aside>

      {/* Main Content */}
      <div className="w-3/4 p-4">
      {isLoading ? (
           <div className="flex justify-center items-center h-full">
           <div className="text-center">
             <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500"></div>
             <p className="mt-4 text-blue-500 font-semibold">Loading...</p>
           </div>
         </div>
       ) : (
         <div>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Chats</h1>
          <button 
           onClick={handleCreateNewRequest}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            + Create New Request
          </button>
        </div>

        <div className="flex">
          {/* Recent Chats */}
          <div className="w-1/3 bg-white shadow-md rounded-lg p-4">
            <div className="flex items-center bg-gray-100 p-2 rounded-md mb-4">
              <FiSearch className="text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="bg-gray-100 outline-none ml-2 text-sm"
              />
            </div>
            {chatData.map((chat) => (
              <div
                key={chat.id}
                onClick={() => handleChatSelection(chat.id)}
                className={`flex items-center space-x-4 p-2 border-b border-gray-200 cursor-pointer ${selectedChat && selectedChat.id === chat.id ? "bg-blue-100" : "hover:bg-gray-100"}`}
              >
                <img
                  src={chat.image}
                  alt={chat.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="font-bold text-sm">{chat.name}</h3>
                  <p className="text-sm text-gray-600 truncate">
                    {chat.message}
                  </p>
                </div>
                <span className="text-xs text-gray-400">{chat.lastActive}</span>
              </div>
            ))}
          </div>

          {/* Chat Window */}
          {selectedChat ? (
  <div className="w-2/3 bg-white shadow-md rounded-lg p-4 ml-4">
    {/* Chat Header */}
    <div className="flex items-center mb-4">
      <img src={selectedChat.image} alt={selectedChat.name} className="w-12 h-12 rounded-full" />
      <div className="ml-4">
        <h2 className="font-bold">{selectedChat.name}</h2>
        <p className="text-sm text-gray-500">Last active: {selectedChat.lastActive}</p>
      </div>
    </div>

               {/* Chat Messages */}
    <div className="h-64 overflow-y-scroll p-2 border-t border-b mb-4">
      <div className="mb-4">
        <div className="flex justify-end">
          <div className="bg-blue-500 text-white p-2 rounded-md max-w-xs">
            {selectedChat.message}
                    </div>
                  </div>
                </div>
              </div>
          

          {/* Chat Input */}
          <div className="flex items-center mt-4">
            <button className="text-gray-500 hover:text-gray-700"
            onClick={() => document.getElementById("fileInput").click()}
            >
              <FiPaperclip className="text-lg" />
            </button>
            <input
    id="fileInput"
    type="file"
    className="hidden"
    onChange={(e) => handleFileUpload(e.target.files[0])}
    accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
  />
            <input
              type="text"
              placeholder="Type your message"
              className="w-full p-2 border border-gray-300 rounded-lg ml-2"
              value={typedMessage}
              onChange={(e) => setTypedMessage(e.target.value)}
            />
            <button className="text-blue-500 hover:text-blue-700 ml-2"
                onClick={handleSendMessage}
                >
              <FiSend className="text-lg" />
            </button>
            </div>
            </div>
            ) : null}

     {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Choose an Avatar</h2>
            <div className="grid grid-cols-3 gap-4">
              {Object.entries(avatarImages).map(([gender, avatars]) => (
                <div key={gender}>
                  <h3 className="font-semibold mb-2">{gender.charAt(0).toUpperCase() + gender.slice(1)}</h3>
                  {avatars.map((avatar, index) => (
                    <img
                      key={index}
                      src={avatar}
                      alt={`Avatar ${index}`}
                      className="w-20 h-20 rounded-full cursor-pointer hover:opacity-80"
                      onClick={() => handleAvatarSelection(avatar)}
                    />
                  ))}
                </div>
              ))}
            </div>
            <button
              className="mt-4 bg-gray-500 text-white p-2 rounded-lg w-full"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )};
    </div>
    </div>
       )}
</div>
</div>
)};
export default RequestStatus;
