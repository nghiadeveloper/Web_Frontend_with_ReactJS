import React, { useState } from "react";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTask, setEditingTask] = useState(null);

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim() === "") return;

    const newTaskObj = {
      id: tasks.length + 1,
      name: newTask,
      completed: false,
    };

    setTasks([...tasks, newTaskObj]);
    setNewTask("");
  };

  const editTask = (task) => {
    setEditingTask(task);
    setNewTask(task.name);
  };

  const updateTask = (e) => {
    e.preventDefault();
    if (newTask.trim() === "") return;

    setTasks(
      tasks.map((task) =>
        task.id === editingTask.id ? { ...task, name: newTask } : task
      )
    );
    setEditingTask(null);
    setNewTask("");
  };

  const deleteTask = (task) => {
    setTasks(tasks.filter((t) => t.id !== task.id));
  };

  const toggleComplete = (task) => {
    setTasks(
      tasks.map((t) =>
        t.id === task.id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card">
              <div className="card-body p-5">
                <h3 style={{ textAlign: "center", marginBottom: "40px" }}>
                  MINI PROJECT TODO LIST
                </h3>
                <form
                  className="d-flex justify-content-center align-items-center mb-4"
                  onSubmit={editingTask ? updateTask : addTask}
                >
                  <div className="form-outline flex-fill">
                    <input
                      type="text"
                      id="form2"
                      className="form-control"
                      placeholder="Thêm công việc"
                      value={newTask}
                      onChange={(e) => setNewTask(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="btn btn-info ms-2">
                    {editingTask ? "Cập nhật" : "Thêm"}
                  </button>
                </form>
                <ul className="nav nav-tabs mb-4 pb-2" id="ex1" role="tablist">
                  <li className="nav-item" role="presentation">
                    <a className="nav-link active">Tất cả công việc</a>
                  </li>
                </ul>
                <div className="tab-content">
                  <div className="tab-pane fade show active">
                    <ul className="list-group mb-0">
                      {tasks.map((task) => (
                        <li
                          key={task.id}
                          className="list-group-item d-flex align-items-center border-0 mb-2 rounded justify-content-between "
                          style={{ backgroundColor: "#f4f6f7" }}
                        >
                          <div>
                            <input
                              className="form-check-input me-2"
                              type="checkbox"
                              checked={task.completed}
                              onChange={() => toggleComplete(task)}
                            />
                            {task.completed ? <s>{task.name}</s> : task.name}
                          </div>
                          <div>
                            <a
                              href="#!"
                              className="text-info"
                              title="Sửa công việc"
                              onClick={() => editTask(task)}
                            >
                              <i className="fas fa-pencil-alt me-3" />
                            </a>
                            <a
                              href="#!"
                              className="text-danger"
                              title="Xóa công việc"
                              onClick={() => deleteTask(task)}
                            >
                              <i className="fas fa-trash-alt" />
                            </a>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TodoList;
