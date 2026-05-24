import { motion } from "motion/react";
import { Helmet } from "react-helmet-async";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export function Contact() {
  return (
    <div className="pt-24 lg:pt-32 pb-24">
      <Helmet>
        <title>Contact Us - ICOM Uganda</title>
      </Helmet>
      
      <div className="container mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="mb-16 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-earth-dark mb-6">Get in Touch</h1>
            <p className="text-lg md:text-xl text-earth-muted font-serif">
              We'd love to hear from you. Reach out to us with any inquiries, feedback, or Partnership requests.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-16">
            {/* Contact Information & Map */}
            <div className="space-y-12">
              <div>
                <h3 className="text-2xl text-earth-dark mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex px-4 py-4 rounded-xl items-start gap-4 transition-colors hover:bg-earth-dark/5">
                    <div className="p-3 bg-woven-teal/10 rounded-lg text-woven-teal shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-earth-dark uppercase tracking-widest text-sm mb-1">Office Location</h4>
                      <p className="text-earth-muted">
                        P.O. Box 16708<br />
                        Wandegeya<br />
                        Kampala, Uganda
                      </p>
                    </div>
                  </div>

                  <div className="flex px-4 py-4 rounded-xl items-start gap-4 transition-colors hover:bg-earth-dark/5">
                    <div className="p-3 bg-earth-accent/10 rounded-lg text-earth-accent shrink-0">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-earth-dark uppercase tracking-widest text-sm mb-1">Email Us</h4>
                      <p className="text-earth-muted">icomuganda@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex px-4 py-4 rounded-xl items-start gap-4 transition-colors hover:bg-earth-dark/5">
                    <div className="p-3 bg-woven-peach/10 rounded-lg text-woven-peach shrink-0">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-earth-dark uppercase tracking-widest text-sm mb-1">Call Us</h4>
                      <p className="text-earth-muted">+256 000 000 000</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div>
                 <h3 className="text-2xl text-earth-dark mb-6">Location Map</h3>
                 <div className="aspect-video w-full rounded-2xl overflow-hidden bg-earth-dark/5 shadow-inner">
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15958.989218206148!2d32.57398184650566!3d0.33400329437937403!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbb0e8c0e7ced%3A0xc6ad50bd65147513!2sUganda%20Museum!5e0!3m2!1sen!2sug!4v1716943894220!5m2!1sen!2sug" 
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }} 
                      allowFullScreen 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                      title="ICOM Uganda Location"
                    ></iframe>
                 </div>
              </div>
            </div>

            {/* Inquiries Form */}
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-earth-dark/10">
              <h3 className="text-2xl text-earth-dark mb-8">Send an Inquiry</h3>
              <form 
                className="space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  // Add actual submission logic here
                  console.log("Form submitted");
                }}
              >
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-earth-dark uppercase tracking-widest mb-2">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full px-6 py-4 rounded-xl border border-earth-dark/10 bg-warm-white focus:outline-none focus:ring-2 focus:ring-earth-accent focus:border-transparent transition-all"
                    placeholder="Enter your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-earth-dark uppercase tracking-widest mb-2">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full px-6 py-4 rounded-xl border border-earth-dark/10 bg-warm-white focus:outline-none focus:ring-2 focus:ring-earth-accent focus:border-transparent transition-all"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-bold text-earth-dark uppercase tracking-widest mb-2">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    className="w-full px-6 py-4 rounded-xl border border-earth-dark/10 bg-warm-white focus:outline-none focus:ring-2 focus:ring-earth-accent focus:border-transparent transition-all"
                    placeholder="How can we help you?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-bold text-earth-dark uppercase tracking-widest mb-2">Message</label>
                  <textarea 
                    id="message" 
                    rows={6}
                    className="w-full px-6 py-4 rounded-xl border border-earth-dark/10 bg-warm-white focus:outline-none focus:ring-2 focus:ring-earth-accent focus:border-transparent transition-all resize-y"
                    placeholder="Write your message here..."
                  ></textarea>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-earth-dark text-white px-8 py-4 rounded-xl font-bold tracking-widest uppercase hover:bg-earth-accent transition-colors"
                >
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </motion.button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
