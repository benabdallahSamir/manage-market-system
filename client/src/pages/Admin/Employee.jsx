import { useEffect, useState } from "react";
import Button from "../com/Button";
import { getUsers } from "../../api/admin/employee";
import AddEmplyee from "./com/AddEmplyee";

function UserRow({ user, editClick }) {
  const { id, username, role } = user;

  return (
    <div className="w-full px-4 py-2 flex items-center rounded-lg border">
      <div>
        <p className="mb-2">{username}</p>
        <p className="text-sm">{role === "EMP" ? "user" : "manager"}</p>
      </div>
      <Button
        onclick={editClick}
        className={"bg-green-500 hover:bg-green-400 w-max ml-auto"}
        text={"edit"}
      />
    </div>
  );
}

export default function Employee() {
  const [users, setusers] = useState(null);
  const [showAddPage, setAddPageVisibility] = useState(false);
  const [editUser, setUserEdit] = useState(null);
  function addEmployeeClick() {
    setAddPageVisibility(true);
  }
  useEffect(() => {
    (async () => {
      const getusers = await getUsers();
      if (getusers.status === 200) setusers(getusers.data.users);
      else alert(getusers.data.message);
    })();
  }, [editUser , showAddPage]);

  if (editUser)
    return (
      <AddEmplyee
        goBack={() => {
          setAddPageVisibility(false);
          setUserEdit(null);
        }}
        user={editUser}
      />
    );
  if (showAddPage)
    return <AddEmplyee goBack={() => setAddPageVisibility(false)} />;
  if (users === null) return <div>loading</div>;
  return (
    <div className="p-4 flex flex-col gap-2">
      <Button
        text={"add employee"}
        className={"mb-3 ml-auto w-max"}
        onclick={addEmployeeClick}
      />
      {users.map((user) => (
        <UserRow
          user={user}
          key={user.id}
          editClick={() => setUserEdit(user)}
        />
      ))}
    </div>
  );
}
