
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, UserCheck, GraduationCap } from "lucide-react";
import AdminDashboard from "@/components/AdminDashboard";
import ParentPortal from "@/components/ParentPortal";

const Index = () => {
  const [userRole, setUserRole] = useState<'admin' | 'parent' | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });

  const handleLogin = (role: 'admin' | 'parent') => {
    // Simple authentication - in real app, this would be handled by backend
    if (loginForm.username && loginForm.password) {
      setUserRole(role);
      setIsLoggedIn(true);
    }
  };

  const handleLogout = () => {
    setUserRole(null);
    setIsLoggedIn(false);
    setLoginForm({ username: '', password: '' });
  };

  if (isLoggedIn && userRole === 'admin') {
    return <AdminDashboard onLogout={handleLogout} />;
  }

  if (isLoggedIn && userRole === 'parent') {
    return <ParentPortal onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <GraduationCap className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">School Management System</h1>
          </div>
          <p className="text-gray-600 text-lg">Manage attendance, fees, and stay connected with your school community</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full w-fit">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl text-blue-800">Admin Portal</CardTitle>
              <CardDescription>
                Manage student attendance, fees, and upload media content
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="admin-username">Username</Label>
                <Input
                  id="admin-username"
                  placeholder="Enter admin username"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="admin-password">Password</Label>
                <Input
                  id="admin-password"
                  type="password"
                  placeholder="Enter password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                />
              </div>
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={() => handleLogin('admin')}
              >
                Login as Admin
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-green-100 rounded-full w-fit">
                <UserCheck className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl text-green-800">Parent Portal</CardTitle>
              <CardDescription>
                View your child's attendance, fees, and school gallery
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="parent-username">Username</Label>
                <Input
                  id="parent-username"
                  placeholder="Enter parent username"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="parent-password">Password</Label>
                <Input
                  id="parent-password"
                  type="password"
                  placeholder="Enter password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                />
              </div>
              <Button 
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={() => handleLogin('parent')}
              >
                Login as Parent
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Demo credentials: Username: demo, Password: demo</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
