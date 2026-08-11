import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

const OnboardingPage = () => {
  const [formData, setFormData] = useState({
    gender: "",
    birthdate: "",
    financialGoal: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Onboarding Data:", formData);
    // Proceed to the next step or complete onboarding
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-4">
      <motion.div
        className="max-w-lg w-full"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="rounded-2xl shadow-xl">
          <CardContent className="p-6">
            <h1 className="text-2xl font-semibold text-center text-gray-800 mb-4">
              Welcome to Bank360!
            </h1>
            <p className="text-center text-gray-600 mb-6">
              Let’s get you started by gathering a few more details.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                  Gender
                </label>
                <select
                  name="gender"
                  id="gender"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={formData.gender}
                  onChange={handleInputChange}
                >
                  <option value="">Select your gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="birthdate" className="block text-sm font-medium text-gray-700">
                  Date of Birth
                </label>
                <Input
                  type="date"
                  id="birthdate"
                  name="birthdate"
                  value={formData.birthdate}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="financialGoal" className="block text-sm font-medium text-gray-700">
                  Your Financial Goal
                </label>
                <Input
                  type="text"
                  id="financialGoal"
                  name="financialGoal"
                  placeholder="e.g., Save for a house, Manage expenses"
                  value={formData.financialGoal}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <Button type="submit" className="w-full mt-4 bg-indigo-600 text-white rounded-md py-2 hover:bg-indigo-700">
                Complete Onboarding
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default OnboardingPage;
