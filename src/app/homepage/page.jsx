import React from "react";

import { FaSearch, FaArrowUp } from "react-icons/fa";
import CourseCard from "@/components/CourseCard/CourseCard";
import Button from "@/components/Button/Button";

export default function HomePage() {
  return (
    <div className="bg-white text-black p-4 space-y-6 font-sans">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="bg-teal-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold">
            ?
          </div>
          <div>
            <p className="text-sm text-gray-500">Good Evening,</p>
            <p className="text-lg font-bold">Saurabh</p>
          </div>
        </div>
        <div className="bg-gray-100 p-2 rounded-full shadow">
          <FaSearch className="text-xl" />
        </div>
      </div>

      {/* Hero Section */}
      <div>
        <h2 className="text-3xl font-bold leading-tight">
          Tell us <br /> what you <br /> want to learn?
        </h2>
        <p className="text-sm mt-2">
          Learn any topic, with live <span className="font-semibold">one-on-one</span> online
          classes.
        </p>
      </div>

      {/* Categories */}
      <div>
        <h3 className="font-semibold mb-2">Categories</h3>
        <div className="flex space-x-4 overflow-x-auto">
          {[
            { label: "Academics", color: "bg-blue-200" },
            { label: "Fitness", color: "bg-red-200" },
            { label: "Beauty", color: "bg-pink-200" },
            { label: "Farming", color: "bg-green-200" },
          ].map((cat, i) => (
            <div
              key={i}
              className={`flex flex-col items-center justify-center w-20 h-20 ${cat.color} rounded-full text-xs font-medium`}
            >
              <span>{cat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {['All', 'Upcoming', 'Trending', 'Recent', 'Popularity'].map((filter, idx) => (
          <Button
            key={idx}
            variant="outline"
            className="rounded-full border border-gray-400 px-4 py-1 text-sm"
          >
            {filter}
          </Button>
        ))}
      </div>

      {/* Course Cards */}
      <div className="grid grid-cols-2 gap-4">
        {[...Array(4)].map((_, i) => (
          <CourseCard key={i} className="shadow-md rounded-xl overflow-hidden">
            <img src="/course.jpg" alt="Course" className="w-full h-24 object-cover" />
            <div className="p-2">
              <p className="text-xs text-gray-500">Fitness</p>
              <p className="text-sm font-semibold">Crafting Personalized Diets</p>
              <p className="text-xs text-gray-500">4.8 ⭐ (12)</p>
              <p className="font-bold text-right text-sm mt-1">₹ 800/hr</p>
            </div>
          </CourseCard>
        ))}
      </div>

      {/* View More */}
      <div className="text-center">
        <Button className="bg-teal-700 text-white px-6 py-2 rounded-full">
          View More
        </Button>
      </div>

      {/* Reviews */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <p className="font-semibold">Predator Reviews</p>
          <a href="#" className="text-sm text-teal-600 font-semibold">
            View All
          </a>
        </div>
        <div className="space-y-3">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="bg-gray-100 p-4 rounded-lg">
              <p className="font-semibold">Shivam Bele</p>
              <p className="text-xs">User</p>
              <p className="text-sm mt-2">
                Predator has been a game-changer for my learning journey. With its
                diverse range of topics and easy-to-navigate platform...
              </p>
              <p className="text-right text-xs text-gray-500 mt-2">1 month ago</p>
            </div>
          ))}
        </div>
      </div>

      {/* What's New */}
      <div className="bg-purple-600 text-white rounded-2xl p-4">
        <h4 className="text-lg font-semibold">What's new on Predator?</h4>
        <p className="text-sm">Stay updated and explore exciting features!</p>
        <a href="#" className="underline text-sm">
          Click here to discover.
        </a>
      </div>

      {/* Invite / Connect / Educate */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-600 text-white rounded-xl p-4">
          <p className="font-bold">Invite Friends</p>
          <p className="text-xs mt-1">
            Offer 10% discount, up to Rs. 500 off, on their first Predator class.
          </p>
        </div>
        <div className="bg-green-500 text-white rounded-xl p-4">
          <p className="font-bold">Connect with us.</p>
        </div>
      </div>

      <div className="bg-teal-700 text-white rounded-xl p-4 mt-4">
        <p className="text-sm font-bold">Can you educate someone?</p>
        <p className="text-xs mt-1">Empower others by sharing your knowledge.</p>
        <Button className="bg-white text-teal-700 font-bold mt-2 w-full rounded-full">
          Join Predator
        </Button>
      </div>

      {/* Upcoming Classes */}
      <div className="bg-yellow-400 text-black rounded-xl p-4 mt-4">
        <p className="text-sm font-medium">5 Upcoming Classes</p>
        <p className="font-bold">Upcoming Classes</p>
      </div>

      {/* Move to top */}
      <div className="text-center mt-6">
        <Button variant="outline" className="rounded-full">
          Move to top <FaArrowUp className="ml-2" />
        </Button>
      </div>
    </div>
  );
}
