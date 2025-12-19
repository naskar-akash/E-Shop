import React from 'react'
import { NavLink } from 'react-router-dom'

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-indigo-900">Contact E-Shop</h1>
          <p className="mt-3 text-gray-600">We’re here to help — reach out with questions about orders, products, or returns.</p>
        </header>

        <section className="bg-white rounded-lg shadow p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-3">Customer support</h2>
          <p className="text-gray-600 mb-4">Email: <a className="text-indigo-900 font-medium" href="https://mail.google.com/mail/?view=cm&to=eshop.akash@gmail.com">eshop.akash@gmail.com</a></p>
          <p className="text-gray-600 mb-4">Phone: <span className="font-medium">+91 98765 43210</span> (Mon–Fri, 9am–6pm IST)</p>
          <p className="text-gray-600">Address: <span className="font-medium">123 E-Shop Street, Kolkata, India</span></p>
        </section>

        <section className="bg-white rounded-lg shadow p-8">
          <h2 className="text-2xl font-semibold mb-3">Help & resources</h2>
          <ul className="list-disc list-inside text-gray-600">
            <li>Order tracking and status</li>
            <li>Returns and refunds</li>
            <li>Shipping information</li>
          </ul>
          <div className="mt-6">
            <NavLink to="/" className="inline-block bg-indigo-900 text-white px-6 py-2 rounded">Back to shop</NavLink>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Contact
