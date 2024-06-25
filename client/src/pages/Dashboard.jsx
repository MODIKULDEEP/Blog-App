import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavHeader from "../components/NavHeader";
import AddBlog from "../components/addBlog";
import { useEffect } from "react";

export default function DashboardPage() {
  const Navigate = useNavigate();
  const data = useSelector((state) => state.User);
  useEffect(() => {
    if (data.user === null) {
      Navigate("/");
    }
  }, [data]);
  return (
    <>
      <NavHeader />
      <div className="container mx-auto pt-20">
        <AddBlog />
      </div>
    </>
  );
}
