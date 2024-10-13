"use client";

import { readFile } from "fs/promises";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Heart, Activity } from "lucide-react"
import { useState, useEffect } from 'react';
import { data } from './util';




// Function to calculate Deviation in Minutes
const calculateDeviationMinutes = (prescribedTime, tapTime) => {
  const prescribedDate = new Date(prescribedTime);
  const tapDate = new Date(tapTime);
  return (tapDate - prescribedDate) / (1000 * 60); // Convert milliseconds to minutes
};

// Prepare data for regression
const deviations = data.prescribedTimes.map((time, index) => {
  return calculateDeviationMinutes(time, data.tapTimes[index]);
});

// Prepare input data for linear regression
const X = data.prescribedTimes.map((time) => new Date(time).getTime() / 1000); // Convert to timestamps (seconds)
const y = deviations;

// Linear Regression function 
const linearRegression = (X, y) => {
  const n = X.length;
  const xMean = X.reduce((a, b) => a + b) / n;
  const yMean = y.reduce((a, b) => a + b) / n;

  // Calculate the slope (m) and intercept (b)
  const numerator = X.reduce((sum, x, index) => sum + (x - xMean) * (y[index] - yMean), 0);
  const denominator = X.reduce((sum, x) => sum + (x - xMean) ** 2, 0);
  
  const m = numerator / denominator;
  const b = yMean - m * xMean;

  return { m, b };
};

// Train the model
const { m, b } = linearRegression(X, y);

// Function to predict y values based on X
const predict = (x) => m * x + b;

// Calculate average deviation and risk level
const averageDeviation = y.reduce((a, b) => a + b, 0) / y.length;

// Function to determine risk level
const getRiskLevel = (averageDeviation) => {
  if (averageDeviation <= 5) return 'Low Risk';
  if (averageDeviation <= 15) return 'Medium Risk';
  return 'High Risk';
};


export default function Component() {
  const [prediction, setPrediction] = useState(null); // State for prediction message
  const [riskLevel, setRiskLevel] = useState(getRiskLevel(averageDeviation)); // State for risk level

  // Function to handle prediction when button is clicked
  const handlePrediction = () => {
    // Randomly generate prescribed and tap times
    const randomPrescribedTime = new Date(Date.now() - Math.floor(Math.random() * 30) * 60 * 1000).toISOString(); // Random time in the last 30 minutes
    const randomTapTime = new Date(Date.now() - Math.floor(Math.random() * 60) * 60 * 1000).toISOString(); // Random time in the last hour

    // Calculate the deviation for the randomly generated times
    const deviation = calculateDeviationMinutes(randomPrescribedTime, randomTapTime);
    
    // Update prediction and risk level based on random values
    const predictionValue = predict(new Date(randomPrescribedTime).getTime() / 1000);
    setPrediction(`Prediction for Patient 1: ${predictionValue.toFixed(2)} minutes`);
    setRiskLevel(getRiskLevel(deviation)); // Set risk level based on deviation
  };

  useEffect(() => {
    let allMedications = []

    readFile("./PatientData.json", "utf-8", function read(err, data){
      if(err){throw(err)}else{
          let x = JSON.parse(data)
          let patientMedications = x[0].medications

          for (const [key, value] of Object.entries(patientMedications)){
              allMedications.push(key)
          }
          console.log(allMedications)
      }
    })
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white p-4 shadow-md">
        <h1 className="mb-6 text-2xl font-bold">PHARMAWATCH</h1>
        <nav>
          <Button variant="ghost" className="w-full justify-start">
            Calendar
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            Dashboard
          </Button>
        </nav>
        <div className="mt-6 space-y-2">
        <script src="/home/adpifive/PharmaWatch-1/clientside-frontend/pharmawatch-dashboard/HackHarvard/read_database.js"/>
          {[...Array(12)].map((_, i) => (
            <div key={i} className="flex items-center space-x-2">
              <div className="h-4 w-4 rounded-full bg-purple-200" />
              <div className="h-2 flex-1 bg-gray-200" />
              <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative h-24 w-24">
              <Progress value={75} className="h-full w-full rounded-full" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-semibold">75%</span>
              </div>
            </div>
            <h2 className="text-2xl font-bold">TODAYS PROGRESS</h2>
          </div>
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Dr. Kawasaki" />
              <AvatarFallback>DK</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">Dr. Kawasaki</p>
              <p className="text-sm text-gray-500">kawa.gmail.com</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <Card>
            <CardHeader className="flex flex-row items-center space-x-4">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=64&width=64" alt="Adam Cooper" />
                <AvatarFallback>AC</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>PATIENT</CardTitle>
                <p className="text-2xl font-bold">ADAM COOPER</p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-semibold">SEX</p>
                  <p>M</p>
                </div>
                <div>
                  <p className="text-sm font-semibold">Blood Group</p>
                  <p>A +ve</p>
                </div>
                <div>
                  <p className="text-sm font-semibold">Age</p>
                  <p>20</p>
                </div>
                <div>
                  <p className="text-sm font-semibold">Last Tapped</p>
                  <p>An hour back</p>
                </div>
                <div>
                  <p className="text-sm font-semibold">Dept.</p>
                  <p>Cardiology</p>
                </div>
                <div>
                  <button onClick={handlePrediction}>Patient 1</button>
                  {prediction && <p>{prediction}</p>} {/* Display prediction message */}
                  <p>Risk Level: {riskLevel}</p> {/* Display risk level */}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>APPOINTMENT HISTORY</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Heart className="h-6 w-6 text-red-500" />
                  <div>
                    <p className="font-semibold">HISTOLOGY TEST</p>
                    <p className="text-sm text-gray-500">Dr. Kawasaki</p>
                  </div>
                </div>
                <Button variant="ghost">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Activity className="h-6 w-6 text-blue-500" />
                  <div>
                    <p className="font-semibold">MRI SCAN</p>
                    <p className="text-sm text-gray-500">Dr. Freddy</p>
                  </div>
                </div>
                <Button variant="ghost">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>PRESCRIPTION HISTORY</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                <span className="font-semibold">Tylenol 50mg</span> - Twice a day for next 30 days.
              </p>
              <p>
                <span className="font-semibold">Paracetamol</span> - Only when you are dying.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>PROGRESS PAST MONTH:</CardTitle>
            </CardHeader>
            <CardContent>{/* Add progress chart or data here */}</CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}