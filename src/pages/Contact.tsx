import React, { useState } from "react";
import { motion } from "motion/react";
import { Helmet } from "react-helmet-async";
import { CheckCircle2, Loader2, Mail, MapPin, Phone, Send } from "lucide-react";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    const form = e.currentTarget;
    const data = new FormData(form);

    fetch("https://formsubmit.co/ajax/icomuganda@gmail.com", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        _subject: `Website Inquiry: ${data.get("subject") || "General"}`,
        name: data.get("name"),
        email: data.get("email"),
        subject: data.get("subject"),
        message: data.get("message"),
      }),
    })
      .then(() => {
        setStatus("done");
        form.reset();
      })
      .catch(() => setStatus("error"));
  };

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
            <span className="eyebrow text-earth-accent justify-center mb-4">We're Here to Help</span>
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
                      <p className="text-earth-muted">
                        +256 704 879 520<br />
                        +256 752 499 606
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div>
                 <h3 className="text-2xl text-earth-dark mb-6">Location Map</h3>
                 <div className="aspect-video w-full rounded-2xl overflow-hidden bg-earth-dark/5 shadow-inner">
                    <iframe
                      src="https://maps.google.com/maps?q=Wandegeya,%20Kampala,%20Uganda&t=&z=15&ie=UTF8&iwloc=&output=embed"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="ICOM Uganda Location - Wandegeya"
                    ></iframe>
                 </div>
              </div>
            </div>

            {/* Inquiries Form */}
            <div className="card-surface p-8 md:p-10">
              <h3 className="text-2xl text-earth-dark mb-8">Send an Inquiry</h3>

              {status === "done" ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center text-center py-12"
                >
                  <div className="w-14 h-14 rounded-full bg-green-50 text-green-600 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="font-serif text-xl text-earth-dark mb-2">Message sent</h4>
                  <p className="text-earth-muted text-sm max-w-xs">
                    Thanks for reaching out — our team will get back to you shortly.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-6 text-sm font-semibold text-earth-accent underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="name" className="block text-sm font-bold text-earth-dark uppercase tracking-widest mb-2">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-6 py-4 rounded-xl border border-earth-dark/10 bg-warm-white focus:outline-none focus:ring-2 focus:ring-earth-accent focus:border-transparent transition-all"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-earth-dark uppercase tracking-widest mb-2">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-6 py-4 rounded-xl border border-earth-dark/10 bg-warm-white focus:outline-none focus:ring-2 focus:ring-earth-accent focus:border-transparent transition-all"
                      placeholder="you@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-bold text-earth-dark uppercase tracking-widest mb-2">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      className="w-full px-6 py-4 rounded-xl border border-earth-dark/10 bg-warm-white focus:outline-none focus:ring-2 focus:ring-earth-accent focus:border-transparent transition-all"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-bold text-earth-dark uppercase tracking-widest mb-2">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      className="w-full px-6 py-4 rounded-xl border border-earth-dark/10 bg-warm-white focus:outline-none focus:ring-2 focus:ring-earth-accent focus:border-transparent transition-all resize-y"
                      placeholder="Write your message here..."
                    ></textarea>
                  </div>

                  {status === "error" && (
                    <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                      Something went wrong sending your message. Please try again, or email icomuganda@gmail.com directly.
                    </div>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full flex items-center justify-center gap-2 bg-earth-dark text-white px-8 py-4 rounded-xl font-bold tracking-widest uppercase hover:bg-earth-accent transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === "submitting" ? (
                      <><Loader2 className="w-5 h-5 animate-spin" /><span>Sending...</span></>
                    ) : (
                      <><Send className="w-5 h-5" /><span>Send Message</span></>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
