import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle, 
  Clock, 
  List, 
  BarChart3, 
  User, 
  ArrowRight, 
  CheckCheck
} from "lucide-react";

const Index: React.FC = () => {
  // Function to handle smooth scroll to sections
  const scrollToSection = (sectionId: string) => (event: React.MouseEvent) => {
    event.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b shadow-sm h-16 flex items-center px-4 md:px-6 sticky top-0 z-10">
        <div className="max-w-7xl w-full mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 flex items-center justify-center bg-blue-500 text-white font-bold rounded">T</div>
            <span className="text-lg font-medium">TaskTracker</span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#features" onClick={scrollToSection('features')} className="text-gray-600 hover:text-blue-600">Features</a>
            <a href="#how-it-works" onClick={scrollToSection('how-it-works')} className="text-gray-600 hover:text-blue-600">How it Works</a>
            <a href="#testimonials" onClick={scrollToSection('testimonials')} className="text-gray-600 hover:text-blue-600">Testimonials</a>
          </nav>
          <div className="flex items-center space-x-3">
            <Link to="/login">
              <Button variant="outline">Sign In</Button>
            </Link>
            <Link to="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero section */}
      <section className="flex-1 bg-gradient-to-b from-blue-50 to-indigo-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
                Organize your work and life, finally.
              </h1>
              <p className="text-xl text-gray-600">
                TaskTracker helps you manage your projects, organize tasks, and track progress all in one place.
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <Link to="/signup">
                  <Button size="lg" className="w-full sm:w-auto">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Log In
                  </Button>
                </Link>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <CheckCheck className="h-4 w-4 text-blue-500" />
                <span>No credit card required</span>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <div className="space-y-6">
                  <div className="flex justify-between items-center pb-4 border-b">
                    <h3 className="font-medium text-lg">Project Dashboard</h3>
                    <span className="text-sm text-gray-500">Today</span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 rounded-md flex justify-between items-center">
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                        <span>Complete project setup</span>
                      </div>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Done</span>
                    </div>
                    
                    <div className="p-3 bg-amber-50 rounded-md flex justify-between items-center">
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-amber-600 mr-2" />
                        <span>Design user interface</span>
                      </div>
                      <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">In Progress</span>
                    </div>
                    
                    <div className="p-3 bg-gray-50 rounded-md flex justify-between items-center">
                      <div className="flex items-center">
                        <List className="h-5 w-5 text-gray-600 mr-2" />
                        <span>Implement backend API</span>
                      </div>
                      <span className="text-xs bg-gray-200 text-gray-800 px-2 py-1 rounded-full">To Do</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-100 rounded-full -z-10"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-indigo-100 rounded-full -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section id="features" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Everything you need to stay organized</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              TaskTracker combines the best parts of task management tools to give you a clear view of your work.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Task Management</h3>
              <p className="text-gray-600">
                Create, organize, and track your tasks with intuitive tools and status updates.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <List className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Project Organization</h3>
              <p className="text-gray-600">
                Group related tasks into projects to keep everything organized and accessible.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
              <p className="text-gray-600">
                Monitor your progress and stay on top of deadlines with visual status indicators.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works section */}
      <section id="how-it-works" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How TaskTracker Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our simple process helps you get started and stay organized in minutes.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Create an Account</h3>
              <p className="text-gray-600">
                Sign up with your email to get started with TaskTracker.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Create Projects</h3>
              <p className="text-gray-600">
                Set up projects to organize your different areas of work.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Add Tasks & Track Progress</h3>
              <p className="text-gray-600">
                Create tasks, update their status, and watch your productivity soar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Add Testimonials section */}
      <section id="testimonials" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how TaskTracker has helped professionals organize their work and boost productivity.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Sarah Johnson</h3>
                  <p className="text-sm text-gray-500">Product Manager</p>
                </div>
              </div>
              <p className="italic text-gray-600">
                "TaskTracker has transformed how our team manages projects. The intuitive interface and status tracking features have increased our productivity by 30%."
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                  <User className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Michael Chen</h3>
                  <p className="text-sm text-gray-500">Software Developer</p>
                </div>
              </div>
              <p className="italic text-gray-600">
                "As a developer juggling multiple projects, TaskTracker gives me the organization I need. The status updates and project separation keep everything clear and focused."
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <User className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Emily Rodriguez</h3>
                  <p className="text-sm text-gray-500">Freelance Designer</p>
                </div>
              </div>
              <p className="italic text-gray-600">
                "TaskTracker has simplified my client work tremendously. I can easily track multiple projects and never miss a deadline. It's become essential to my workflow."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Ready to get organized?</h2>
              <p className="text-xl opacity-90">
                Join thousands of users who are already tracking their tasks with TaskTracker.
              </p>
            </div>
            <Link to="/signup">
              <Button size="lg" variant="secondary">
                Get Started for Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 flex items-center justify-center bg-blue-500 text-white font-bold rounded">T</div>
                <span className="text-lg font-medium">TaskTracker</span>
              </div>
              <p className="text-gray-400">
                Organize your work and life, finally.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="#" className="hover:text-white">Features</Link></li>
                <li><Link to="#" className="hover:text-white">How it Works</Link></li>
                <li><Link to="#" className="hover:text-white">Pricing</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="#" className="hover:text-white">Blog</Link></li>
                <li><Link to="#" className="hover:text-white">Support</Link></li>
                <li><Link to="#" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="#" className="hover:text-white">About</Link></li>
                <li><Link to="#" className="hover:text-white">Careers</Link></li>
                <li><Link to="#" className="hover:text-white">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} TaskTracker. All rights reserved.</p>
            <p> Saidul Hoque</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
