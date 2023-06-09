import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Head from "next/head";
import Books from "@/components/Books";
import client from "../../apolloClientIntercept";
import { Login_User_Books, Shelve_By_Status } from "@/services/query/books";
import { useState, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';

const ViewBooks = ({ data, socket }: any) => {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [data1, setData] = useState<any>(data);

  const getAll = async () => {
    try {
      const { data } = await client.query({
        query: Login_User_Books,
      });
      setData(data.shelves);
    } catch (error) {
      toast("Something went wrong")
    }
  };

  const handleTabClick = (index: any) => {
    setSelectedIndex(index);
  };

  const Shelve_By_Status_Record = async (status: any) => {
    try {
      setData([]);
      const { data } = await client.query({
        query: Shelve_By_Status,
        variables: {
          status,
        },
      });
      setData(data.shelveByStatus);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAll();
  }, [socket,selectedIndex]);

  return (
    <>
      <Head>
        <title>View Books - My Library</title>
      </Head>

      <div className="container mx-auto my-8 mt-16" style={{ marginTop: "70px" }}>
        
        <Tabs defaultIndex={1} className="mt-10">
          <TabList className="flex border-b border-gray-200">
            <Tab
              className={`py-4 cursor-pointer px-6 font-semibold text-gray-600 hover:text-gray-800 focus:outline-none ${
                selectedIndex === 0 ? "bg-gray-200" : ""
              }`}
              onClick={() => {
                getAll();
                handleTabClick(0);
              }}
            >
              All
            </Tab>
            <Tab
              className={`py-4 px-6 cursor-pointer text-gray-600 hover:text-gray-800 focus:outline-none ${
                selectedIndex === 1 ? "bg-gray-200 font-bold" : ""
              }`}
              onClick={() => {
                Shelve_By_Status_Record("Want to Read");
                handleTabClick(1);
              }}
            >
              Want to Read
            </Tab>
            <Tab
              className={`py-4 px-6 cursor-pointer text-gray-600 hover:text-gray-800 focus:outline-none ${
                selectedIndex === 2 ? "bg-gray-200 font-bold" : ""
              }`}
              onClick={() => {
                Shelve_By_Status_Record("Reading");
                handleTabClick(2);
              }}
            >
              Reading
            </Tab>
            <Tab
              className={`py-4 px-6 cursor-pointer text-gray-600 hover:text-gray-800 focus:outline-none ${
                selectedIndex === 3 ? "bg-gray-200 font-bold" : ""
              }`}
              onClick={() => {
                Shelve_By_Status_Record("Read");
                handleTabClick(3);
              }}
            >
              Read
            </Tab>
          </TabList>
          <TabPanel>
            <Books data1={data1} socket={socket} setData={setData} />
          </TabPanel>
          <TabPanel>
            <Books data1={data1} socket={socket} setData={setData} />
          </TabPanel>
          <TabPanel>
            <Books data1={data1} socket={socket} setData={setData} />
          </TabPanel>
        </Tabs>
      </div>
    </>
  );
};

export default ViewBooks;
