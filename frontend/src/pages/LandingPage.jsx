import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Phone, 
  MapPin, 
  Clock, 
  Wrench, 
  Settings, 
  Shield, 
  Star, 
  CheckCircle, 
  MessageCircle,
  ArrowRight,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Business Info
const BUSINESS = {
  name: "Hassan Service 24x7",
  phone: "7676912951",
  address: "Near Basaveshwara Kalyana Mantapa, Pension Mohalla Police Station Road, Hosaline Road, Hassan, Karnataka 573201",
  shortAddress: "Hosaline Road, Hassan",
  timings: "Mon - Sun : 07:00 AM - 08:30 PM",
  whatsappMessage: "Hello Hassan Service 24x7, I need help with my washing machine.",
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.123456789!2d76.0999!3d13.0068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sHassan%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1234567890"
};

// Images from design guidelines
const IMAGES = {
  hero: "https://static.prod-images.emergentagent.com/jobs/028737a3-8ff5-4cb6-bdf2-f283ee27469a/images/9ed359e8a79885c6f1781ea48d0c162a2fe0b534969c0c7c5292e5f895df5ce2.png",
  repair: "https://images.unsplash.com/photo-1662220984920-3bd1f88e846f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MTN8MHwxfHNlYXJjaHwyfHx3YXNoaW5nJTIwbWFjaGluZSUyMHJlcGFpcnxlbnwwfHx8fDE3NzQ2MDMyMTJ8MA&ixlib=rb-4.1.0&q=85",
  installation: "https://static.prod-images.emergentagent.com/jobs/028737a3-8ff5-4cb6-bdf2-f283ee27469a/images/a1d3ad65d88eab33af0a621b1a79e78f5a84b9709eedb1b1766f3dc1b63545c2.png",
  amc: "https://static.prod-images.emergentagent.com/jobs/028737a3-8ff5-4cb6-bdf2-f283ee27469a/images/27225dcd92b651cadf3e5f12e4e1fe7ebe527dd5b13906747626111bcf68396f.png",
  background: "https://static.prod-images.emergentagent.com/jobs/028737a3-8ff5-4cb6-bdf2-f283ee27469a/images/0c7b2bb7ffcd3d4af3c3f7c5a10067fcf0768f6074a23e07587aae52c45507b0.png",
  qrCode: "https://customer-assets.emergentagent.com/job_laundry-service-pro/artifacts/swn1pnxo_qr-code.jpg.jpeg",
  // Additional gallery images
  gallery1: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=800&q=80",
  gallery2: "https://images.pexels.com/photos/5591463/pexels-photo-5591463.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  gallery3: "https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?w=800&q=80",
  gallery4: "https://images.pexels.com/photos/4700389/pexels-photo-4700389.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
};

// YouTube video IDs for washing machine repair tutorials
const VIDEOS = [
  { id: "yDDPjNNSCrA", title: "Ultimate DIY Washer Repair Guide" },
  { id: "wEA5XHrTwSM", title: "Dead Washing Machine Repair" },
  { id: "XBllmAjrjbQ", title: "Front Load Washer Fixes" }
];

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Header Component
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/90 border-b border-slate-200" data-testid="header">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2" data-testid="logo">
            <div className="w-10 h-10 bg-[#0055FF] rounded-xl flex items-center justify-center">
              <Wrench className="w-6 h-6 text-white" />
            </div>
            <span className="font-outfit text-xl md:text-2xl font-bold text-slate-900">
              Hassan <span className="text-[#0055FF]">Service 24x7</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-slate-600 hover:text-[#0055FF] transition-colors font-medium" data-testid="nav-services">Services</a>
            <a href="#gallery" className="text-slate-600 hover:text-[#0055FF] transition-colors font-medium" data-testid="nav-gallery">Gallery</a>
            <a href="#booking" className="text-slate-600 hover:text-[#0055FF] transition-colors font-medium" data-testid="nav-booking">Book Now</a>
            <a href="#payment" className="text-slate-600 hover:text-[#0055FF] transition-colors font-medium" data-testid="nav-payment">Payment</a>
            <a href="#contact" className="text-slate-600 hover:text-[#0055FF] transition-colors font-medium" data-testid="nav-contact">Contact</a>
          </nav>

          {/* Call CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a 
              href={`tel:${BUSINESS.phone}`}
              className="flex items-center gap-2 bg-[#0055FF] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#0044CC] transition-all hover:scale-105"
              data-testid="call-now-btn"
            >
              <Phone className="w-5 h-5" />
              Call Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            data-testid="mobile-menu-btn"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="md:hidden py-4 border-t border-slate-200"
            data-testid="mobile-menu"
          >
            <nav className="flex flex-col gap-4">
              <a href="#services" className="text-slate-600 hover:text-[#0055FF] transition-colors font-medium py-2">Services</a>
              <a href="#gallery" className="text-slate-600 hover:text-[#0055FF] transition-colors font-medium py-2">Gallery</a>
              <a href="#booking" className="text-slate-600 hover:text-[#0055FF] transition-colors font-medium py-2">Book Now</a>
              <a href="#payment" className="text-slate-600 hover:text-[#0055FF] transition-colors font-medium py-2">Payment</a>
              <a href="#contact" className="text-slate-600 hover:text-[#0055FF] transition-colors font-medium py-2">Contact</a>
              <a 
                href={`tel:${BUSINESS.phone}`}
                className="flex items-center justify-center gap-2 bg-[#0055FF] text-white px-6 py-3 rounded-full font-semibold"
              >
                <Phone className="w-5 h-5" />
                Call Now
              </a>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
};

// Hero Section
const HeroSection = () => {
  return (
    <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden hero-gradient" data-testid="hero-section">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-[#0055FF]/10 text-[#0055FF] px-4 py-2 rounded-full text-sm font-medium mb-6">
              <CheckCircle className="w-4 h-4" />
              Trusted by 1000+ Customers
            </div>
            
            <h1 className="font-outfit text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-6">
              Expert Washing Machine
              <span className="text-[#0055FF]"> Repair & Service</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed">
              Fast, reliable, and affordable washing machine repair services at your doorstep. 
              <span className="font-semibold text-[#0055FF]"> 24x7 Service Available</span> in Hassan and surrounding areas.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#booking"
                className="inline-flex items-center justify-center gap-2 bg-[#0055FF] text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#0044CC] transition-all hover:scale-105 shadow-lg shadow-blue-500/30"
                data-testid="hero-book-btn"
              >
                Book Service
                <ArrowRight className="w-5 h-5" />
              </a>
              
              <a 
                href={`https://wa.me/91${BUSINESS.phone}?text=${encodeURIComponent(BUSINESS.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#20BD5A] transition-all hover:scale-105"
                data-testid="hero-whatsapp-btn"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Us
              </a>
            </div>

            {/* Quick Stats */}
            <div className="flex gap-8 mt-12">
              <div>
                <div className="stat-number text-3xl md:text-4xl">500+</div>
                <p className="text-slate-600 text-sm">Repairs Done</p>
              </div>
              <div>
                <div className="stat-number text-3xl md:text-4xl">5+</div>
                <p className="text-slate-600 text-sm">Years Experience</p>
              </div>
              <div>
                <div className="stat-number text-3xl md:text-4xl">4.9</div>
                <p className="text-slate-600 text-sm">Customer Rating</p>
              </div>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src={IMAGES.hero}
                alt="Professional washing machine technician"
                className="w-full h-auto object-cover"
                data-testid="hero-image"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            {/* Floating Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl border border-slate-100"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#FFB800] rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Same Day Service</p>
                  <p className="text-sm text-slate-500">Available 7 days a week</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Services Section
const ServicesSection = () => {
  const services = [
    {
      title: "Repair Service",
      description: "Expert diagnosis and repair for all washing machine brands. We fix motor issues, drainage problems, control board failures, and more.",
      image: IMAGES.repair,
      icon: Wrench,
      features: ["All Brands", "Same Day Service", "Genuine Parts"]
    },
    {
      title: "Installation",
      description: "Professional installation of new washing machines. Includes water connection, drainage setup, and testing.",
      image: IMAGES.installation,
      icon: Settings,
      features: ["Expert Setup", "Water Connection", "Full Testing"]
    },
    {
      title: "AMC Plans",
      description: "Annual Maintenance Contracts for worry-free washing machine care. Regular servicing and priority support.",
      image: IMAGES.amc,
      icon: Shield,
      features: ["Regular Service", "Priority Support", "Discounted Repairs"]
    }
  ];

  return (
    <section id="services" className="py-16 md:py-24 lg:py-32 bg-slate-50" data-testid="services-section">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-outfit text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Our Services
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Comprehensive washing machine services to keep your appliance running smoothly
          </p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="service-card bg-white rounded-2xl overflow-hidden border border-slate-200"
              data-testid={`service-card-${index}`}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <div className="w-12 h-12 bg-[#0055FF] rounded-xl flex items-center justify-center">
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="font-outfit text-xl font-semibold text-slate-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature, idx) => (
                    <span 
                      key={idx}
                      className="inline-flex items-center gap-1 text-sm bg-[#0055FF]/10 text-[#0055FF] px-3 py-1 rounded-full"
                    >
                      <CheckCircle className="w-3 h-3" />
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Why Choose Us Section
const WhyChooseUs = () => {
  const features = [
    {
      icon: Clock,
      title: "24x7 Service Available",
      description: "Round the clock emergency repair service for your convenience"
    },
    {
      icon: Shield,
      title: "Warranty on Repairs",
      description: "All our repairs come with a service warranty for peace of mind"
    },
    {
      icon: Star,
      title: "Experienced Technicians",
      description: "Skilled professionals with years of hands-on experience"
    },
    {
      icon: CheckCircle,
      title: "Genuine Parts",
      description: "We use only genuine and high-quality replacement parts"
    }
  ];

  return (
    <section className="py-16 md:py-24 lg:py-32" data-testid="why-choose-section">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-outfit text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Why Choose Hassan Service 24x7?
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            We are committed to providing the best washing machine repair service in Hassan
          </p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="text-center"
              data-testid={`feature-${index}`}
            >
              <div className="feature-icon mx-auto mb-4">
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="font-outfit text-lg font-semibold text-slate-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Booking Form Section
const BookingSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.service) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      await axios.post(`${API}/bookings`, formData);
      toast.success("Booking submitted successfully! We will contact you soon.");
      setFormData({ name: "", phone: "", service: "", message: "" });
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Failed to submit booking. Please try again or call us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      id="booking" 
      className="py-16 md:py-24 lg:py-32 relative"
      style={{
        backgroundImage: `url(${IMAGES.background})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
      data-testid="booking-section"
    >
      <div className="absolute inset-0 bg-white/90"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-outfit text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Book a Service
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Fill out the form below and we will get back to you within 30 minutes
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto"
        >
          <Card className="bg-white shadow-xl border-0">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6" data-testid="booking-form">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Your Name *
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="h-12 rounded-xl"
                    data-testid="booking-name-input"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Phone Number *
                  </label>
                  <Input
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="h-12 rounded-xl"
                    data-testid="booking-phone-input"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Service Required *
                  </label>
                  <Select
                    value={formData.service}
                    onValueChange={(value) => setFormData({...formData, service: value})}
                  >
                    <SelectTrigger className="h-12 rounded-xl" data-testid="booking-service-select">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="repair">Washing Machine Repair</SelectItem>
                      <SelectItem value="installation">New Installation</SelectItem>
                      <SelectItem value="amc">AMC (Annual Maintenance)</SelectItem>
                      <SelectItem value="general">General Service</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Additional Message
                  </label>
                  <Textarea
                    placeholder="Describe your issue or requirement..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="rounded-xl min-h-[100px]"
                    data-testid="booking-message-input"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 bg-[#0055FF] hover:bg-[#0044CC] text-white text-lg font-semibold rounded-xl transition-all hover:scale-[1.02]"
                  data-testid="booking-submit-btn"
                >
                  {isSubmitting ? "Submitting..." : "Book Service Now"}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-slate-500 text-sm">
                  Or call us directly at{" "}
                  <a href={`tel:${BUSINESS.phone}`} className="text-[#0055FF] font-semibold">
                    {BUSINESS.phone}
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

// Payment Section
const PaymentSection = () => {
  return (
    <section id="payment" className="py-16 md:py-24 lg:py-32 bg-slate-50" data-testid="payment-section">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-outfit text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Easy Payment Options
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Pay securely using PhonePe or Google Pay by scanning the QR code below
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <div className="qr-container max-w-sm mx-auto text-center">
            <div className="bg-slate-100 p-4 rounded-2xl mb-6">
              <img 
                src={IMAGES.qrCode}
                alt="PhonePe Payment QR Code"
                className="w-full max-w-[280px] mx-auto rounded-xl"
                data-testid="payment-qr-code"
              />
            </div>
            
            <h3 className="font-outfit text-xl font-semibold text-slate-900 mb-2">
              Scan to Pay
            </h3>
            <p className="text-slate-600 mb-4">
              UPI: zeeshanafrin786-2@okhdfcbank
            </p>
            
            <div className="flex justify-center gap-4">
              <div className="flex items-center gap-2 text-slate-600">
                <div className="w-8 h-8 bg-[#5F259F] rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-bold">Pe</span>
                </div>
                <span className="text-sm">PhonePe</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <div className="w-8 h-8 bg-white rounded-lg border flex items-center justify-center">
                  <span className="text-[#4285F4] text-xs font-bold">G</span>
                </div>
                <span className="text-sm">Google Pay</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Testimonials Section
const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Rajesh Kumar",
      location: "Hassan",
      rating: 5,
      text: "Excellent service! The technician came within an hour and fixed my washing machine quickly. Very professional and reasonable pricing."
    },
    {
      name: "Priya Sharma",
      location: "Hosaline Road",
      rating: 5,
      text: "I have been using Hassan Service 24x7 for annual maintenance. Their AMC plan is worth every rupee. Highly recommended!"
    },
    {
      name: "Mohammed Ali",
      location: "Hassan Town",
      rating: 5,
      text: "Quick response, genuine parts, and fair pricing. The best washing machine repair service in our area."
    }
  ];

  return (
    <section className="py-16 md:py-24 lg:py-32" data-testid="testimonials-section">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-outfit text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Trusted by hundreds of families in Hassan and surrounding areas
          </p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="testimonial-card"
              data-testid={`testimonial-${index}`}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#FFB800] text-[#FFB800]" />
                ))}
              </div>
              <p className="text-slate-600 mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>
              <div>
                <p className="font-semibold text-slate-900">{testimonial.name}</p>
                <p className="text-sm text-slate-500">{testimonial.location}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Gallery Section
const GallerySection = () => {
  const galleryImages = [
    { src: IMAGES.gallery1, alt: "Washing machine service" },
    { src: IMAGES.gallery2, alt: "Expert technician at work" },
    { src: IMAGES.gallery3, alt: "Modern washing machine" },
    { src: IMAGES.gallery4, alt: "Professional repair service" },
    { src: IMAGES.repair, alt: "Washing machine repair" },
    { src: IMAGES.installation, alt: "Installation service" }
  ];

  return (
    <section id="gallery" className="py-16 md:py-24 bg-slate-50" data-testid="gallery-section">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-outfit text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Our Work Gallery
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            See our expert technicians in action - Quality service guaranteed
          </p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
        >
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="relative overflow-hidden rounded-2xl aspect-square group"
              data-testid={`gallery-image-${index}`}
            >
              <img 
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-white font-medium">{image.alt}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Video Section
const VideoSection = () => {
  return (
    <section className="py-16 md:py-24" data-testid="video-section">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-outfit text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Helpful Tips & Videos
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Learn how to maintain your washing machine and common troubleshooting tips
          </p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {VIDEOS.map((video, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="rounded-2xl overflow-hidden shadow-lg bg-white"
              data-testid={`video-${index}`}
            >
              <div className="relative aspect-video bg-slate-200">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0"
                ></iframe>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-slate-900">{video.title}</h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Location Map Section
const LocationSection = () => {
  return (
    <section className="py-16 md:py-24 bg-slate-50" data-testid="location-section">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-outfit text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Visit Our Office
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {BUSINESS.address}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8 items-center"
        >
          {/* Map */}
          <div className="rounded-2xl overflow-hidden shadow-xl h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31009.10297867!2d76.08!3d13.0068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba4d79a7a7f1d5d%3A0x7c0a40f4a5a5a5a5!2sHassan%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Hassan Service 24x7 Location"
            ></iframe>
          </div>

          {/* Address Card */}
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[#0055FF] rounded-xl flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-outfit text-xl font-semibold text-slate-900">
                Our Location
              </h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="font-semibold text-slate-900 mb-1">Hassan Service 24x7</p>
                <p className="text-slate-600">
                  Near Basaveshwara Kalyana Mantapa,<br />
                  Pension Mohalla Police Station Road,<br />
                  Hosaline Road, Hassan,<br />
                  Karnataka 573201
                </p>
              </div>

              <div className="flex items-center gap-3 text-slate-600">
                <Phone className="w-5 h-5 text-[#0055FF]" />
                <a href={`tel:${BUSINESS.phone}`} className="hover:text-[#0055FF]">
                  +91 {BUSINESS.phone}
                </a>
              </div>

              <div className="flex items-center gap-3 text-slate-600">
                <Clock className="w-5 h-5 text-[#0055FF]" />
                <span>{BUSINESS.timings}</span>
              </div>

              <div className="pt-4">
                <a
                  href="https://maps.google.com/?q=Hassan+Karnataka+573201"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#0055FF] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#0044CC] transition-all"
                  data-testid="get-directions-btn"
                >
                  <MapPin className="w-5 h-5" />
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Footer Section
const Footer = () => {
  return (
    <footer id="contact" className="bg-[#0B1120] text-white py-16 md:py-20" data-testid="footer-section">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-[#0055FF] rounded-xl flex items-center justify-center">
                <Wrench className="w-6 h-6 text-white" />
              </div>
              <span className="font-outfit text-2xl font-bold">
                Hassan <span className="text-[#FFB800]">Service 24x7</span>
              </span>
            </div>
            <p className="text-slate-400 mb-6">
              Your trusted partner for washing machine repair and maintenance services in Hassan. Available 24x7 for emergency repairs.
            </p>
            <div className="inline-flex items-center gap-2 bg-[#FFB800]/20 text-[#FFB800] px-4 py-2 rounded-full text-sm font-medium">
              <Clock className="w-4 h-4" />
              24x7 Emergency Service
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-outfit text-lg font-semibold mb-6">Contact Us</h3>
            <div className="space-y-4">
              <a 
                href={`tel:${BUSINESS.phone}`}
                className="flex items-center gap-3 text-slate-400 hover:text-[#FFB800] transition-colors"
                data-testid="footer-phone"
              >
                <Phone className="w-5 h-5" />
                +91 {BUSINESS.phone}
              </a>
              <div 
                className="flex items-start gap-3 text-slate-400"
                data-testid="footer-address"
              >
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span className="text-sm">
                  Near Basaveshwara Kalyana Mantapa,<br />
                  Pension Mohalla Police Station Road,<br />
                  Hosaline Road, Hassan - 573201
                </span>
              </div>
              <div className="flex items-center gap-3 text-slate-400">
                <Clock className="w-5 h-5" />
                <span>{BUSINESS.timings}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-outfit text-lg font-semibold mb-6">Quick Links</h3>
            <div className="space-y-3">
              <a href="#services" className="block text-slate-400 hover:text-[#FFB800] transition-colors">Services</a>
              <a href="#booking" className="block text-slate-400 hover:text-[#FFB800] transition-colors">Book Service</a>
              <a href="#payment" className="block text-slate-400 hover:text-[#FFB800] transition-colors">Payment</a>
              <a href="#gallery" className="block text-slate-400 hover:text-[#FFB800] transition-colors">Gallery</a>
              <a 
                href={`https://wa.me/91${BUSINESS.phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-slate-400 hover:text-[#25D366] transition-colors"
              >
                WhatsApp Chat
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 text-center">
          <p className="text-slate-500 text-sm">
            © 2024 Hassan Service 24x7. All rights reserved. | Serving Hassan & Surrounding Areas
          </p>
        </div>
      </div>
    </footer>
  );
};

// Floating WhatsApp Button
const FloatingWhatsApp = () => {
  return (
    <motion.a
      href={`https://wa.me/91${BUSINESS.phone}?text=${encodeURIComponent(BUSINESS.whatsappMessage)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform whatsapp-pulse"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: "spring" }}
      data-testid="floating-whatsapp"
    >
      <MessageCircle className="w-7 h-7" />
    </motion.a>
  );
};

// Main Landing Page Component
const LandingPage = () => {
  return (
    <div className="min-h-screen" data-testid="landing-page">
      <Header />
      <HeroSection />
      <ServicesSection />
      <WhyChooseUs />
      <GallerySection />
      <VideoSection />
      <BookingSection />
      <PaymentSection />
      <TestimonialsSection />
      <LocationSection />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default LandingPage;
