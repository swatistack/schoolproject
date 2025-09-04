import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";

export default function AddSchool(){
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset, formState:{ errors, isSubmitting } } = useForm({
    defaultValues:{ name:"", address:"", city:"", state:"", contact:"", email_id:"" }
  });

  const onSubmit = async (data) => {
    try{
      setLoading(true);
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("address", data.address);
      formData.append("city", data.city);
      formData.append("state", data.state);
      formData.append("contact", data.contact);
      formData.append("email_id", data.email_id);
      if (data.image && data.image[0]) formData.append("image", data.image[0]);

      const res = await fetch("/api/schools", { method:"POST", body: formData });
      const out = await res.json();
      if(!res.ok) throw new Error(out.message || "Failed");
      alert("School added ✅");
      reset();
      router.push("/showSchools");
    }catch(err){
      alert("Error: " + err.message);
    }finally{
      setLoading(false);
    }
  };

  return (
    <>
      <nav className="nav">
        <div className="nav-inner container">
          <Link href="/" className="brand"><span className="brand-logo">SP</span><span>SchoolPortal</span></Link>
          <div className="actions"><Link className="btn" href="/showSchools">View Schools</Link></div>
        </div>
      </nav>

      <div className="container">
        <h2 style={{margin:"60px 0 6px", textAlign:"center"}}>Add School</h2>
        {/* <p className="badge">Image is stored in <code>/public/schoolImages</code></p> */}

        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="field">
            <label>School Name</label>
            <input className="input" placeholder="eg. Green Valley High School"
              {...register("name", { required:"Name is required", minLength:{value:3,message:"Min 3 chars"} })}
            />
            {errors.name && <span className="error">{errors.name.message}</span>}
          </div>

          <div className="field">
            <label>Address</label>
            <input className="input" placeholder="Street, Area" {...register("address", { required:"Address is required" })}/>
            {errors.address && <span className="error">{errors.address.message}</span>}
          </div>

          <div className="field">
            <label>City</label>
            <input className="input" placeholder="City" {...register("city", { required:"City is required" })}/>
            {errors.city && <span className="error">{errors.city.message}</span>}
          </div>

          <div className="field">
            <label>State</label>
            <input className="input" placeholder="State" {...register("state", { required:"State is required" })}/>
            {errors.state && <span className="error">{errors.state.message}</span>}
          </div>

          <div className="field">
            <label>Contact Number</label>
            <input className="input" placeholder="10-digit number"
              {...register("contact", {
                required:"Contact is required",
                pattern:{ value:/^[0-9+\-() ]{7,20}$/, message:"Enter a valid phone" }
              })}
            />
            {errors.contact && <span className="error">{errors.contact.message}</span>}
          </div>

          <div className="field">
            <label>Email</label>
            <input className="input" placeholder="name@example.com"
              {...register("email_id", {
                required:"Email is required",
                pattern:{ value:/^[^\s@]+@[^\s@]+\.[^\s@]+$/, message:"Invalid email" }
              })}
            />
            {errors.email_id && <span className="error">{errors.email_id.message}</span>}
          </div>

          <div className="field">
            <label>School Image</label>
            <input type="file" accept="image/*" className="file" {...register("image", { required:"Image is required" })}/>
            {errors.image && <span className="error">{errors.image.message}</span>}
          </div>

          <div className="actions">
            <button className="btn" type="submit" disabled={isSubmitting || loading}>
              {loading ? "Saving..." : "Save School"}
            </button>
            <Link href="/" className="btn">Back Home</Link>
          </div>
        </form>
      </div>
    </>
  );
}
