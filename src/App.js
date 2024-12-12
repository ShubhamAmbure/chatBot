import React, { useState} from 'react';
import { Search, Filter, Send, X } from "lucide-react";
import chatData from './chat-data.json';

const chatSessions = [
  { id: "chat1", name: "John Mayers", message: "Lorem ipsum dolor sit amet Consectetur...", time: "3 min ago", designation: "UI Developer", pic: "/users/012.jpeg" },
  { id: "chat2", name: "Tony Stark", designation: "Product Designer", message: "Lorem ipsum dolor sit amet Consectetur...", time: "10 min ago", pic: "/users/015.jpeg" },
  { id: "chat3", name: "Bessie Berry", message: "Lorem ipsum dolor sit amet Consectetur...", time: "3 hours ago", designation: "Graphic Designer", pic: "/users/014.jpeg" },
  { id: "chat4", name: "Gleb Kuznetsov", message: "Lorem ipsum dolor sit amet Consectetur...", time: "4 hours ago", designation: "Test Engineer", pic: "/users/019.jpeg" },
  { id: "chat5", name: "Andrey Prokopenko", message: "Lorem ipsum dolor sit amet Consectetur...", time: "8 hours ago", designation: "UI Developer", pic: "/users/017.jpeg" },
  { id: "chat6", name: "Nick Herasimenka", message: "Lorem ipsum dolor sit amet Consectetur...", time: "22 hours ago", designation: "Product Designer", pic: "/users/018.jpeg" },
  { id: "chat7", name: "Valentin Salmon", message: "Lorem ipsum dolor sit amet Consectetur...", time: "Dec 10", designation: "Graphic Designer", pic: "/users/024.jpeg" },
  { id: "chat8", name: "Miro Kirov", designation: "HR", message: "Lorem ipsum dolor sit amet Consectetur...", time: "Dec 2", pic: "/users/022.jpeg" },
  
];


export default function Component() {
  const [isOpen, setIsOpen] = useState(false); //Filter state
  const [selectedChat, setSelectedChat] = useState(chatData.data["chat1"]); //selectedChat state
  const [selectedProfile, setSelectedProfile] = useState(chatSessions[0])
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState([
    {  name: 'UI Developer', checked: false },
    { name: 'Product Designer', checked: false },
    { name: 'Test Engineer', checked: false },
    { name: 'Graphic Designer', checked: false },
    { name: 'HR', checked: false },
    
  ]);

  const [filteredChats, setFilteredChats] = useState(chatSessions);

  // Handle search input
  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);
    filterChats(searchValue, filters);
  };

  // Handle filter change
  const handleFilterChange = (index) => {
    const updatedFilters = [...filters];
    updatedFilters[index].checked = !updatedFilters[index].checked;
    setFilters(updatedFilters);
    filterChats(searchTerm, updatedFilters);
  };

  // Filter chats based on search and designation filter
  const filterChats = (search, activeFilters) => {
    let filtered = chatSessions.filter((chat) =>
      chat.name.toLowerCase().includes(search)
    );

    const activeDesignations = activeFilters.filter(f => f.checked).map(f => f.name);
    if (activeDesignations.length > 0) {
      filtered = filtered.filter((chat) =>
        activeDesignations.includes(chat.designation)
      );
      
    }

    setFilteredChats(filtered);
  };

  // Handle chat session click
  const handleChatClick = (chatId) => {
    const chatDetails = chatData.data[chatId];
    setSelectedChat(chatDetails);
    const chatNumber = chatId.split("chat")
    setSelectedProfile(chatSessions[chatNumber[1]-1])
  };

  return (
    <div className="flex h-screen bg-white">
      <div className="md:w-1/3 w-full border-r border-gray-200 flex flex-col">
        <div className="bg-[#00A0AE] text-white p-4">
          <h2 className="text-xl font-Source Sans Pro, Semibold">CHAT SESSIONS</h2>
        </div>

        <div className="p-4 flex-1 overflow-y-auto">
          <div className="flex items-center mb-4">
            <div className='flex items-center w-full'>
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search here"
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-md"
                  onChange={handleSearch}
                  value={searchTerm}
                />
                <Search className="absolute left-2 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              <button
                className="ml-2 p-2 text-gray-400 hover:text-gray-600 "
                onClick={() => setIsOpen(!isOpen)}
              >
                <Filter className="h-5 w-5  text-[#00A0AE]" />
              </button>
            </div>
          </div>

          {isOpen && (
            <div className="absolute top-28 left-36 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
              {filters.map((filter, index) => (
                <label key={index} className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filter.checked}
                    onChange={() => handleFilterChange(index)}
                    className="mr-2"
                  />
                  <span>{filter.name}</span>
                </label>
              ))}
            </div>
          )}

          {/* Chat list items */}
          {filteredChats.map((chat) => (
            <div key={chat.id} className="flex items-center py-3 border-b border-gray-200 last:border-b-0 cursor-pointer" onClick={() => handleChatClick(chat.id)}>
              <img
                src={chat.pic}
                alt={chat.name}
                className="h-12 w-12 rounded-full"
              />
              <div className="ml-3 flex-1">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-Source Sans Pro">{chat.name}</h3>
                  <span className="text-xs text-gray-500">{chat.time}</span>
                </div>
                <p className="text-sm text-gray-600 truncate">{chat.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="md:w-3/4 hidden md:flex flex-col">
        <div className="bg-[#00A0AE] text-white p-4 flex justify-between items-center">
          <h2 className="text-xl font-Source Sans Pro, Semibold">CHAT DETAILS</h2>
          <button className="text-white">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Chat Details Section */}
        <div className="flex-1 overflow-auto p-4">
          <div className='flex border-b mb-2 pb-2 gap-2 items-center'>
            <div>
              <img className='w-12 h-12 rounded-full' src={selectedProfile.pic}/>
            </div>
            <div>
              <h2 className=''>{selectedProfile.name}</h2>
              <p className='text-sm text-gray-500'>{selectedProfile.designation}</p>
            </div>
          </div>
          {selectedChat ? (
            selectedChat.map((msg, index) => (
              <div key={index} className={`flex items-start mb-4  ${msg.from.type === 'user2' ? 'justify-end' : ''}`}>
                <div className={`${msg.from.type === 'user1' ? 'bg-gray-100 rounded-br-2xl' : 'bg-[#00A0AE] text-white rounded-bl-2xl'} rounded-t-xl p-3 max-w-lg`}>
                  <p className="text-sm">{msg.msg.message}</p>
                </div>
              </div>
            ))
          ) : (
            <p>Select a chat to view details.</p>
          )}
        </div>

        {/* Chat Input Section */}
        <div className="p-4 border-t border-gray-200">
  <div className="relative mr-1 bg-gray-200 rounded-lg">
    <input
      type="text"
      className="px-2 w-full py-8 bg-gray-200 rounded-md"
      placeholder="Type your message..."
    />
    <button className="absolute top-2 right-2 text-white bg-[#00A0AE]  px-3 py-1 rounded-lg">
      Send
    </button>
  </div>
</div>

      </div>
    </div>
  );
}


