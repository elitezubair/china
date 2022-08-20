import React, { useEffect, useState } from "react";
import axios from "axios";
import { endpoints } from "./services/endpoints";
import { useSelector, useDispatch } from "react-redux";
import { updateUsersList } from "./actions";

const Card = (props) => {
  const { item } = props;

  return (
    <>
      <div className="shadow-lg p-6 rounded-lg mb-12  mx-4 w-96 hover:bg-slate-200 bg-slate-100">
        <div className="flex my-1">
          <h4 className="w-24 text-Neutral-200 pr-2 font-medium font-sans">
            Id
          </h4>
          :<h6 className="ml-4">{item?.id}</h6>
        </div>
        <div className="flex my-1">
          <h4 className="w-24 text-Neutral-200 pr-2 font-medium font-sans">
            Name
          </h4>
          :<h6 className="ml-4">{item?.name}</h6>
        </div>
        <div className="flex my-1">
          <h4 className="w-24 text-Neutral-200 pr-2 font-medium font-sans">
            UserName
          </h4>
          :<h6 className="ml-4">{item?.username}</h6>
        </div>
        <div className="flex my-1">
          <h4 className="w-24 text-Neutral-200 pr-2 font-medium font-sans">
            Website
          </h4>
          :<h6 className="ml-4">{item?.website}</h6>
        </div>
        <div className="flex my-1">
          <h4 className="w-24 text-Neutral-200 pr-2 font-medium font-sans">
            Company{" "}
          </h4>
          :<h6 className="ml-4">{item?.company.name}</h6>
        </div>
      </div>
    </>
  );
};

const Users = () => {
  const url = `${endpoints.userApi}/users`;
  const dispatch = useDispatch();

  // getting the usersList from the redux store ;
  const [userList, setUserList] = useState([]);
  const usersListFromStore = useSelector((state) => state.usersData.data);
  const [loading, setLoading] = useState(false);

  const getList = () => {
    setLoading(true)
    axios
      .get(url)
      .then((res) => {
        setLoading(false)
        if (res.status == 200) {
          const val = res.data;
          dispatch(updateUsersList(val));
          setUserList(val)
        }
      })
      .catch((err) => {
        setLoading(false);
        alert("something went wrong")
        console.log(err, "this is the error");
      });
  };

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    setUserList(usersListFromStore);
  }, []);

  const [inputValue, setInputValue] = useState("");

  const handleInput = (e) => {
    const val = e.target.value;
    setInputValue(val);

    const value = val.toLowerCase();

    const filterData = usersListFromStore.filter((itm) => {
      const name = itm.name.toLowerCase();
      const username = itm.username.toLowerCase();
      return name.includes(value) || username.includes(value);
    });

    setUserList(filterData);

    if (val == "") {
      setUserList(usersListFromStore);
    }
  };

  const reloadData = () => {
    getList();
  };

  return (
    <>
      <div className="">
        <div className="w-full">
          <div className="flex justify-between w-19/20 px-32 mt-8">
            <input
              type="text"
              className="  py-2 px-4 border-2 border-stone-600 rounded-lg w-80"
              placeholder="Search User ..."
              onChange={(e) => handleInput(e)}
              value={inputValue}
            />
            <h1
              className="font-serif text-3xl font-bold underline text-center"
              style={{ marginLeft: "-40px" }}
            >
              Users List
            </h1>
            <button
              className="bg-sky-600 px-20 rounded-lg text-white font-bold"
              onClick={reloadData}
            >

              {loading ? 
              <div role="status">
                <svg
                  aria-hidden="true"
                  class="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span class="sr-only">Loading...</span>
              </div>
              : "Reload"}
            </button>
          </div>
        </div>

        <div className="flex justify-center items-center w-full ">
          <div className="container flex flex-wrap w-19/20  mt-8">
            {userList &&
              userList.map((item, index) => {
                return <Card item={item} key={index} />;
              })}

            {userList.length === 0 && (
              <h1 className="font-bold text-2xl">Sorry ! No data available </h1>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
