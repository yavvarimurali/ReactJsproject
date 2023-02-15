import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactTable from "react-table";
import { useForm } from "react-hook-form";

import Modal from "./ModalComponent";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { register, handleSubmit, reset, errors } = useForm();

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts").then((response) => {
      setPosts(response.data);
    });
  }, []);

  const columns = [
    {
      Header: "Title",
      accessor: "title",
    },
    {
      Header: "Body",
      accessor: "body",
    },
    {
      Header: "User ID",
      accessor: "userId",
    },
    {
      Header: "Actions",
      Cell: (row) => (
        <div>
          <button onClick={() => handleEdit(row.original)}>Edit</button>
          <button onClick={() => handleDelete(row.original.id)}>Delete</button>
        </div>
      ),
    },
  ];

  const handleCreate = () => {
    setShowModal(true);
  };

  const handleCreatePost = (data) => {
    axios
      .post("https://jsonplaceholder.typicode.com/posts", data)
      .then((response) => {
        setPosts([...posts, response.data]);
        setShowModal(false);
        reset();
      });
  };

  const handleEdit = (post) => {
    setShowModal(true);
    // set initial form values for editing post
  };

  const handleUpdatePost = (data) => {
    axios
      .put(`https://jsonplaceholder.typicode.com/posts/${data.id}`, data)
      .then((response) => {
        const updatedPosts = posts.map((post) =>
          post.id === response.data.id ? response.data : post
        );
        setPosts(updatedPosts);
        setShowModal(false);
        reset();
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`).then(() => {
        const updatedPosts = posts.filter((post) => post.id !== id);
        setPosts(updatedPosts);
      });
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    reset();
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={handleCreate}>Create</button>
      <ReactTable data={posts} columns={columns} />
      {showModal && (
        <Modal handleClose={handleCloseModal}>
          <form onSubmit={handleSubmit(handleCreatePost)}>
            <div>
              <label>Title</label>
              <input name="title" ref={register({ required: true })} />
              {errors.title && <span>This field is required</span>}
            </div>
            <div>
              <label>Body</label>
              <textarea name="body" ref={register({ required: true })} />
              {errors.body && <span>This field is required</span>}
            </div>
            <div>
              <label>User ID</label>
              <input name="userId" type="number" ref={register({ required: true })} />
              {errors.userId && <span>This field is required</span>}
            </div>
            <button type="submit">Save</button>
          </form>
        </Modal>
      )};
      {showModal && (
        <Modal handleClose={handleCloseModal}>
          <form onSubmit={handleSubmit(handleCreatePost)}>
            <div>
              <label>Title</label>
              <input name="title" ref={register({ required: true })} />
              {errors.title && <span>This field is required</span>}
            </div>
            <div>
              <label>Body</label>
              <textarea name="body" ref={register({ required: true })} />
              {errors.body && <span>This field is required</span>}
            </div>
            <div>
              <label>User ID</label>
              <input name="userId" type="number" ref={register({ required: true })} />
              {errors.userId && <span>This field is required</span>}
            </div>
            <button type="submit">Save</button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default Dashboard;

