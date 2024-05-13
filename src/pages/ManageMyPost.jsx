import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import MyVolunteerNeedposts from "../components/MyVolunteerNeedposts";
import MyRequest from "../components/MyRequest";

const ManageMyPost = () => {
  return (
    <div className="container mx-auto text-center min-h-96">
      <div className="text-center " data-aos="fade-down">
        <h1 className="text-2xl md:text-4xl font-bold mb-1">
          <span className="text-pink-500">Manage</span> My Post
        </h1>
        <div className="inline-flex items-center justify-center w-full">
          <hr className="w-64  my-4 border-pink-500 border rounded "></hr>
          <div className="absolute px-4 -translate-x-1/2 bg-base-100 left-1/2 ">
            <svg
              className="w-2 h-2 text-gray-400 "
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 14"
            >
              <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
            </svg>
          </div>
        </div>
      </div>
      <Tabs>
        <TabList>
          <Tab> My Post</Tab>
          <Tab>My Request Post</Tab>
        </TabList>

        <TabPanel>
          <h2>
            <MyVolunteerNeedposts />
          </h2>
        </TabPanel>
        <TabPanel>
          <MyRequest />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default ManageMyPost;
