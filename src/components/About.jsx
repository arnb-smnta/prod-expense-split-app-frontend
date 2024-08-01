import { aboutList, TechnologiesUsed } from "@/lib/helpers";
import React from "react";

const About = () => {
  return (
    <div className="flex justify-center items-center text-center pt-28">
      <div className="w-[60%]">
        <div className="">
          <h1 className="text-2xl font-bold text-gray-700 mb-2">Split App </h1>

          <h2 className="text-xl">
            Built with the MERN stack (MongoDB, Express, React and NodeJS)
          </h2>
        </div>

        <div>
          <h3 className="mt-2">Arnab Samanta || Open Source ❤️</h3>
        </div>

        <div className="mt-4">
          <a
            href="https://github.com/arnb-smnta/expense-split-prod-backend/issues"
            className="text-blue-500 underline mr-4"
            target="_blank"
          >
            Report Bug
          </a>
          <a
            href="https://github.com/arnb-smnta/expense-split-prod-backend/issues"
            className="text-blue-500 underline"
            target="_blank"
          >
            Request Feature
          </a>
        </div>

        <div className="mt-2 text-left">
          <h1 className="text-2xl font-bold text-gray-700">
            Mern Stack Group Expense Splitting Application
          </h1>

          <ul className="list-disc list-inside">
            {aboutList.map((item, index) => {
              return (
                <a key={index} href={`#${item.link}`}>
                  <li className="text-blue-500 underline hover:text-blue-700 active:text-blue-900">
                    {item.name}
                  </li>
                </a>
              );
            })}
            <li className="text-blue-500 underline hover:text-blue-700 active:text-blue-900">
              {TechnologiesUsed.name}
              <ul className="list-disc list-inside ml-6">
                {TechnologiesUsed.subLinks.map((item, index) => {
                  return (
                    <a key={index} href={`#${item.link}`}>
                      <li className="text-blue-500 underline hover:text-blue-700 active:text-blue-900">
                        {item.name}
                      </li>
                    </a>
                  );
                })}
              </ul>
            </li>
          </ul>
        </div>

        <div className={`mb-4`} id={`${aboutList[0].link}`}>
          <h1 className="text-2xl font-bold text-gray-700 mb-4">
            Introduction
          </h1>
          <p className="font-medium">
            This is a side project I've been working on. A full stack expense
            spliting app - splitwise clone made using the MERN stack (MongoDB,
            Express, React & Nodejs), specially designed to split group expense
            between friends, but can be used for almost any type of business
            need. With this application, you can add your expense details and
            get an whole expense analytics feature - Group Balance, Monthly
            amount spend, Catagory wise expense spending graph etc... Jump right
            off the Live App and start adding your expenses or download the
            entire Source code-
            <a
              href="https://github.com/arnb-smnta/expense-split-prod-backend"
              className="text-blue-500 underline"
              target="_blank"
            >
              Backend
            </a>{" "}
            and{" "}
            <a
              href="https://github.com/arnb-smnta/prod-expense-split-app-frontend"
              className="text-blue-500 underline"
              target="_blank"
            >
              Frontend
            </a>{" "}
            and run it on your server. This project is something I've been
            working on in my free time so I cannot be sure that everything will
            work out correctly. But I'll appreciate you if can report any issue.
          </p>
        </div>

        <div className="mb-4">
          <h1>Features</h1>

          <div id={`${aboutList[1].link}`}>
            <h1 className="text-2xl font-bold text-gray-700 mb-4">
              Key Features
            </h1>
            <ul className="list-disc list-inside text-left font-medium">
              <li>Create user groups and track group expense</li>
              <li>
                Keep track of shared expenses and settle your corresponding
                balances in a convenient and personalized way.
              </li>
              <li>
                Get Analytical graphs to understand your expenditure trend
              </li>
              <li>Multiple user registration</li>
              <li>Authentication using JSON web token (JWT)</li>
            </ul>
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-bold text-gray-700 mb-4">
            Technologies Used
          </h1>

          <p className="mb-2">
            This project was created using the following technologies.
          </p>
          <div
            className="text-left"
            id={`${TechnologiesUsed.subLinks[0].link}`}
          >
            <h1 className="text-xl font-bold text-gray-700 mb-2">Frontend</h1>
            <ul className="list-disc list-inside font-medium">
              <li>React js</li>
              <li>Redux (for managing and centralizing application state) </li>
              <li>Axios (for making api calls)</li>
              <li>Shadcn (for user interface)</li>
            </ul>
          </div>
          <div
            className="text-left"
            id={`${TechnologiesUsed.subLinks[1].link}`}
          >
            <h1 className="text-xl font-bold text-gray-700 mb-2">Backend</h1>
            <ul className="list-disc list-inside font-medium">
              <li>Express</li>
              <li>Mongoose</li>
              <li>JWT(for authentication)</li>
              <li>bcryptJs(for data encryption)</li>
            </ul>
          </div>

          <div
            className="text-left"
            id={`${TechnologiesUsed.subLinks[2].link}`}
          >
            <h1 className="text-xl font-bold text-gray-700 mb-2">Database</h1>
            <ul className="list-disc list-inside font-medium">
              <li>MongoDB(MongoDB Atlas)</li>
            </ul>
          </div>
        </div>

        <div className="mb-2">
          <h1 className="text-2xl font-bold text-gray-700 mb-2">Comment</h1>
          <p className="font-medium">
            I intend to keep adding more features to this application, so if you
            like it, please give it a star, that will encourage me to to keep
            improving the project.
          </p>
        </div>
        <div
          className={`mb-2 ${aboutList[2].link}`}
          id={`${aboutList[2].link}`}
        >
          <h1 className="text-2xl font-bold text-gray-700">
            Configuration and Setup
          </h1>
          <p></p>
        </div>
        <div className="mb-2" id={`${aboutList[3].link}`}>
          <h1 className="text-2xl font-bold text-gray-700">Licence</h1>
          <p className="font-medium">
            This project is MIT licensed. Copyright 2024 Arnab Samanta
            Permission is hereby granted, free of charge, to any person
            obtaining a copy of this software and associated documentation files
            (the "Software"), to deal in the Software without restriction,
            including without limitation the rights to use, copy, modify, merge,
            publish, distribute, sublicense, and/or sell copies of the Software,
            and to permit persons to whom the Software is furnished to do so,
            subject to the following conditions: The above copyright notice and
            this permission notice shall be included in all copies or
            substantial portions of the Software. THE SOFTWARE IS PROVIDED "AS
            IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
            NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
            PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
            AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR
            OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
            OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
            OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
          </p>
        </div>

        <div className="my-8 text-xl font-medium">
          Arnab Samanta🔥FULL STACK ENTHUSIAST & Open Source contributor ||{" "}
          <a
            className="text-blue-500 underline"
            target="_blank"
            href="https://github.com/arnb-smnta"
          >
            Github Profile
          </a>
        </div>
      </div>{" "}
    </div>
  );
};

export default About;
