// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaClock, FaDollarSign, FaUserAlt } from 'react-icons/fa'; // Importing some helpful icons for styling

// Expanded sample data for featured services with more details and testimonials
const sampleFeaturedServices = [
  {
    id: 1,
    name: "Mental Health Counseling",
    description: "Get professional help with mental health issues like anxiety, depression, stress, and more.",
    duration: "50 mins",
    price: "$75",
    expert: "Dr. John Doe, Licensed Therapist",
    testimonials: [
      { id: 1, text: "The therapy helped me regain control of my life. Highly recommended!" },
      { id: 2, text: "A safe space for my emotions—changed my perspective for the better!" },
      { id: 3, text: "I feel so much better after just a few sessions. Dr. Doe is amazing!" }
    ],
  },
  {
    id: 2,
    name: "Relationship Counseling",
    description: "Guidance for couples looking to improve their relationship, whether it’s for communication, trust, or intimacy.",
    duration: "60 mins",
    price: "$85",
    expert: "Dr. Jane Smith, Relationship Expert",
    testimonials: [
      { id: 1, text: "Our communication has improved tremendously. This was life-changing for us!" },
      { id: 2, text: "A must-do for any couple wanting to grow stronger together." },
      { id: 3, text: "We learned more about each other in one session than we did in years!" }
    ],
  },
  {
    id: 3,
    name: "Career Counseling",
    description: "Professional career advice to help you identify your strengths, career path, or transition to a new job.",
    duration: "45 mins",
    price: "$65",
    expert: "Susan Lee, Career Strategist",
    testimonials: [
      { id: 1, text: "Great advice! I landed my dream job with Susan's guidance!" },
      { id: 2, text: "The resume revamp helped me stand out—I'm thrilled with the result!" },
      { id: 3, text: "Susan provided invaluable insight that accelerated my career growth!" }
    ],
  },
  {
    id: 4,
    name: "Stress Management Counseling",
    description: "Learn how to reduce and manage stress with proven techniques that promote relaxation and mental well-being.",
    duration: "45 mins",
    price: "$70",
    expert: "Mark Adams, Stress Management Expert",
    testimonials: [
      { id: 1, text: "I feel so much more relaxed after just a few sessions with Mark!" },
      { id: 2, text: "The breathing exercises and mindfulness techniques have transformed my days." },
      { id: 3, text: "Finally, a method that really works! Mark was professional and empathetic." }
    ],
  },
  {
    id: 5,
    name: "Child and Adolescent Counseling",
    description: "Help for children and teens dealing with stress, bullying, behavior issues, or developmental challenges.",
    duration: "40 mins",
    price: "$60",
    expert: "Emily Richards, Child Therapist",
    testimonials: [
      { id: 1, text: "My teenager was struggling, but Emily made him feel heard and empowered." },
      { id: 2, text: "After starting counseling, my child’s behavior improved drastically!" },
      { id: 3, text: "Emily really connected with my child and provided a safe space for them." }
    ],
  },
  {
    id: 5,
    name: "Maturnity and childhealth Counseling",
    description: "Moms for children and teens dealing with stress, bullying, behavior issues, or developmental challenges.",
    duration: "40 mins",
    price: "$60",
    expert: "Emily Richards, Child Therapist",
    testimonials: [
      { id: 1, text: "My teenager was struggling, but Emily made him feel heard and empowered." },
      { id: 2, text: "After starting counseling, my child’s behavior improved drastically!" },
      { id: 3, text: "Emily really connected with my child and provided a safe space for them." }
    ],
  },
];


const Home = () => {
  const [featuredServices, setFeaturedServices] = useState([]);

  // Simulating data fetching from an API
  useEffect(() => {
    setFeaturedServices(sampleFeaturedServices);
  }, []);

  return (
    <div className="home-container px-4 md:px-8 py-6">
      
      
      {/* Introduction to the platform */}
      <p className="intro-text text-xl mb-8 text-center text-gray-600">
        We are here to guide you through a transformative journey toward personal well-being and fulfillment.
        Choose a service that fits your needs, and take the first step today.
      </p>
      
      {/* Featured Services */}
      <div className="features">
        <h2 className="text-2xl font-semibold mb-6">Featured Services</h2>
        <div className="services-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredServices.length > 0 ? (
            featuredServices.map((service) => (
              <div key={service.id} className="service-card border p-6 bg-white rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
                <h3 className="text-xl font-bold text-indigo-800">{service.name}</h3>
                <p className="text-gray-700 mt-2">{service.description}</p>

                {/* Service Details with Icons */}
                <div className="service-details mt-4 space-y-2">
                  <div className="flex items-center">
                    <FaClock className="text-indigo-500 mr-2" /> <span>{service.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <FaDollarSign className="text-indigo-500 mr-2" /> <span>{service.price}</span>
                  </div>
                  <div className="flex items-center">
                    <FaUserAlt className="text-indigo-500 mr-2" /> <span>{service.expert}</span>
                  </div>
                </div>

                {/* Testimonials Section */}
                <div className="testimonials mt-4">
                  <h4 className="font-semibold text-indigo-700">What clients are saying:</h4>
                  <ul className="list-disc ml-5 mt-2 text-gray-600">
                    {service.testimonials.map((testimonial) => (
                      <li key={testimonial.id}>{testimonial.text}</li>
                    ))}
                  </ul>
                </div>

                {/* Action Links */}
                <div className="mt-6 space-x-4">
                  <Link to={`/service/${service.id}`} className="btn btn-secondary bg-indigo-500 text-white px-2 py-2 rounded-md hover:bg-indigo-600">
                     More
                  </Link>
                  <Link to={`/appointment`} className="btn btn-primary bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600">
                     Appointment
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No services available right now. Please check back later.</p>
          )}
        </div>
      </div>

      </div>
  );
};

export default Home;
