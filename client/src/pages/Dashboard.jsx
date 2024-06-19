import NavHeader from "../components/NavHeader";
import AddBlog from "../components/addBlog";

export default function DashboardPage() {
  return (
    <>
      <NavHeader />
      <div className="container mx-auto pt-20">
        <AddBlog />
      </div>
    </>
  );
}
