import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../../assets/assets'

const Aboutus = () => {
  return (
    <div className="min-h-screen bg-blue-100 text-gray-800 py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-indigo-900">About E-Shop</h1>
          <p className="mt-3 text-gray-600">An initiative to provide your wish at the doorsteps at an affordable price</p>
        </header>

        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
          <p className="text-gray-600">E-Shop was built to bring curated products to customers with a focus on quality, value and exceptional customer service. We believe shopping should be simple, transparent, and enjoyable.</p>
        </section>

        <section className="grid md:grid-cols-2 gap-6 mb-8">
          <article className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-2">What we offer</h3>
            <ul className="list-disc list-inside text-gray-600">
              <li>Wide selection across categories</li>
              <li>Secure payments and fast shipping</li>
              <li>Friendly customer support</li>
            </ul>
          </article>
          <article className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-2">Our values</h3>
            <p className="text-gray-600">We put customers first, operate with integrity, and focus on continuous improvement to deliver the best shopping experience.</p>
          </article>
        </section>

        <section className="mb-12 flex flex-col justify-center items-center">
          <h2 className="text-2xl font-semibold mb-6">Meet the team</h2>
            <div className="bg-white py-4 px-6 rounded-lg shadow-md flex flex-col justify-center items-center">
              <div className="h-24 w-24 rounded-full bg-gray-200 mb-6 overflow-hidden">
                <img src={assets.founder} alt="Founder" className="h-full w-full object-contain" />
              </div>
              <h4 className="font-bold">Akash Naskar</h4>
              <p className="text-sm text-gray-500">Founder & Developer</p>
            </div>
        </section>

        <section className="text-center">
          <p className="text-gray-600 mb-4">Have questions? Reach out to us anytime at <a className="text-indigo-900 font-bold" href="https://mail.google.com/mail/?view=cm&to=eshop.akash@gmail.com">eshop.akash@gmail.com</a>.</p>
          <NavLink to="/" className="inline-block bg-indigo-900 text-white px-6 py-3 rounded">Start Shopping</NavLink>
        </section>
      </div>
    </div>
  )
}

export default Aboutus
