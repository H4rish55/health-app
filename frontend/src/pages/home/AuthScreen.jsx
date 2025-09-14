import React, { useState, useEffect, useRef } from "react";
import {
  ChevronRight,
  Heart,
  Shield,
  Zap,
  ArrowRight,
  CheckCircle,
  Activity,
  Brain,
  Gauge,
  ShieldCheck,
  BarChart3,
} from "lucide-react";
import NavBar from "../../components/NavBar";
import { useNavigate } from "react-router-dom";

const FloatingCard = ({ children, delay = 0, className = "" }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            obs.unobserve(e.target); // reveal once
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 transform ${
        visible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
      } ${className}`}
      style={{ transitionDelay: `${delay * 0.2}s` }}
    >
      {children}
    </div>
  );
};

const AuthScreen = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) =>
      setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();

    navigate("/signup");
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-x-hidden relative">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: `
              radial-gradient(circle at ${mousePosition.x * 0.15}% ${
              mousePosition.y * 0.15
            }%, rgba(120, 119, 198, 0.6), transparent 40%),
              radial-gradient(circle at ${100 - mousePosition.x * 0.1}% ${
              100 - mousePosition.y * 0.1
            }%, rgba(255, 119, 198, 0.3), transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(120, 219, 226, 0.25), transparent 60%)
            `,
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(rgba(99, 102, 241, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99, 102, 241, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
            transform: `translateY(${scrollY * 0.2}px)`,
          }}
        />
      </div>

      {/* Navigation */}
      <NavBar />

      {/* Hero */}
      <section className="relative z-10 pt-20 sm:pt-24 lg:pt-28 pb-12 sm:pb-16 lg:pb-20 px-3 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl sm:text-5xl lg:text-7xl xl:text-8xl font-bold leading-tight mb-4 sm:mb-6 lg:mb-8">
              <div className="space-y-2 sm:space-y-3">
                <span className="block animate-pulse">Revolutionary</span>
                <span className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Healthcare
                </span>
                <span className="block">Intelligence</span>
              </div>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-400 max-w-4xl mx-auto mb-8 sm:mb-10 lg:mb-12 leading-relaxed px-4">
              Empowering doctors and patients with AI-driven insights,
              personalized care, and seamless health management in the digital
              age.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-8 sm:mb-12 lg:mb-16">
              <button
                className="w-full sm:w-auto group bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-base sm:text-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/30 flex items-center justify-center"
                onClick={handleClick}
              >
                Get Started Free
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </button>

              <div className="flex items-center space-x-2 text-gray-300">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-sm sm:text-base">
                  No credit card required
                </span>
              </div>
            </div>

            {/* Floating feature cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
              {[
                {
                  icon: Heart,
                  title: "Patient Care",
                  desc: "24/7 AI monitoring",
                  color: "from-red-500 to-pink-500",
                },
                {
                  icon: Shield,
                  title: "Secure Data",
                  desc: "Enterprise security",
                  color: "from-green-500 to-emerald-500",
                },
                {
                  icon: Zap,
                  title: "AI Powered",
                  desc: "Smart diagnostics",
                  color: "from-yellow-500 to-orange-500",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/20"
                  style={{
                    transform: `translateY(${
                      Math.sin((scrollY + index * 100) * 0.01) * 8
                    }px)`,
                  }}
                >
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features + AI Models */}
      <section className="relative z-10 py-12 sm:py-16 lg:py-20 px-3 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <FloatingCard delay={1}>
            <div className="text-center mb-8 sm:mb-12 lg:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-3 sm:mb-4 lg:mb-6">
                Why Choose{" "}
                <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  VitalIQ
                </span>
                ?
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto px-4 mb-8 sm:mb-12">
                Experience the future of healthcare with our cutting-edge
                platform designed for both medical professionals and patients.
              </p>

              {/* AI Models Showcase */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
                {[
                  {
                    title: "Stroke Prediction",
                    desc: "Advanced neural networks analyze risk factors to predict stroke likelihood with 94% accuracy",
                    icon: Brain,
                    color: "from-red-500 to-orange-500",
                    accuracy: "94%",
                  },
                  {
                    title: "Heart Disease Detection",
                    desc: "Deep learning algorithms analyze ECG data and symptoms to identify cardiac conditions",
                    icon: Heart,
                    color: "from-purple-500 to-pink-500",
                    accuracy: "96%",
                  },
                  {
                    title: "Diabetes Prediction",
                    desc: "Machine learning models assess glucose patterns and lifestyle factors for early detection",
                    icon: Activity,
                    color: "from-blue-500 to-cyan-500",
                    accuracy: "91%",
                  },
                ].map((model, index) => (
                  <div
                    key={index}
                    className="group bg-gray-900/70 backdrop-blur-xl border border-white/20 rounded-2xl p-4 sm:p-6 hover:bg-gray-800/70 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/20 relative overflow-hidden"
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${model.color} opacity-10 group-hover:opacity-20 transition-opacity duration-500`}
                    />
                    <div className="relative z-10">
                      <div
                        className={`w-12 h-12 bg-gradient-to-r ${model.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                      >
                        <model.icon className="w-6 h-6 text-white" />
                      </div>

                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold text-white group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                          {model.title}
                        </h3>
                        <span
                          className={`text-sm font-bold bg-gradient-to-r ${model.color} bg-clip-text text-transparent`}
                        >
                          {model.accuracy}
                        </span>
                      </div>

                      <p className="text-gray-300 text-sm leading-relaxed mb-4 group-hover:text-gray-200 transition-colors duration-300">
                        {model.desc}
                      </p>

                      <div className="bg-gray-700 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${model.color} rounded-full transition-all duration-1000 group-hover:animate-pulse`}
                          style={{ width: model.accuracy }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FloatingCard>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <FloatingCard delay={2}>
              <div className="space-y-6 sm:space-y-8">
                {[
                  {
                    icon: BarChart3,
                    title: "Personal Health Insights",
                    desc: "Get instant feedback on stroke, diabetes, and heart risks with personalized ML-driven insights.",
                    color: "from-blue-500 to-cyan-500",
                  },
                  {
                    icon: Brain,
                    title: "AI Diagnostics",
                    desc: "Advanced machine learning models provide accurate diagnoses 40% faster than traditional methods.",
                    color: "from-purple-500 to-pink-500",
                  },
                  {
                    icon: ShieldCheck,
                    title: "Privacy First",
                    desc: "Your predictions stay secure — no sensitive health data is ever stored.",
                    color: "from-green-500 to-teal-500",
                  },
                ].map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4 group">
                    <div
                      className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg`}
                    >
                      <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-semibold mb-2 group-hover:text-indigo-400 transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </FloatingCard>

            <FloatingCard delay={3}>
              <div className="relative">
                <div className="bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-8 hover:shadow-2xl hover:shadow-indigo-500/30 transition-all duration-500">
                  <div className="grid grid-cols-2 gap-4 sm:gap-6">
                    {[
                      {
                        label: "Success Rate",
                        value: "98%",
                        icon: CheckCircle,
                        color: "from-green-400 to-green-600",
                      },
                      {
                        label: "ML Models",
                        value: "3",
                        icon: Brain,
                        color: "from-purple-400 to-pink-500",
                      },
                      {
                        label: "Avg Inference",
                        value: "<150 ms",
                        icon: Gauge,
                        color: "from-blue-400 to-cyan-500",
                      },
                      {
                        label: "PHI Stored",
                        value: "0",
                        icon: ShieldCheck,
                        color: "from-indigo-400 to-purple-500",
                      },
                    ].map((stat, index) => (
                      <div
                        key={index}
                        className="text-center group p-3 sm:p-4 rounded-2xl hover:bg-white/5 transition-all duration-300"
                      >
                        <div
                          className={`w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-300`}
                        >
                          <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        </div>
                        <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                          {stat.value}
                        </div>
                        <div className="text-gray-400 text-xs sm:text-sm mt-1">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FloatingCard>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-12 sm:py-16 lg:py-20 px-3 sm:px-6 lg:px-8">
        <FloatingCard delay={4}>
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 sm:p-12 hover:shadow-2xl hover:shadow-indigo-500/30 transition-all duration-500 relative overflow-hidden">
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-3xl animate-pulse" />
                <div
                  className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl animate-pulse"
                  style={{ animationDelay: "1s" }}
                />
              </div>

              <div className="relative z-10">
                <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-4 sm:mb-6">
                  Ready to Transform <br className="hidden sm:block" />
                  <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Healthcare?
                  </span>
                </h2>
                <p className="text-base sm:text-lg lg:text-xl text-gray-400 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
                  Discover how AI can bring smarter, faster, and safer health
                  predictions — powered by VitalIQ.
                </p>
                <button
                  className="group bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-8 sm:px-12 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-base sm:text-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/30 flex items-center mx-auto"
                  onClick={handleClick}
                >
                  Start Your Journey
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </FloatingCard>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/20 py-8 sm:py-12 px-3 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              VitalIQ
            </span>
          </div>
          <p className="text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base">
            Empowering healthcare through intelligent technology.
          </p>
          <div className="text-xs sm:text-sm text-gray-500">
            © 2025 VitalIQ. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AuthScreen;
