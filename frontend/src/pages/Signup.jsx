import React, { useState } from "react";

const signup = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
    domain: "",
    nameExtended: false,
    sendEmail: false,
    phone: false,
    op1: false,
    op1Text: "",
    op2: false,
    op2Text: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
  };
  return (
    <div className="parent h-screen">
      <div className="child flex flex-col items-center justify-center gap-4">
        <h2 className="text-4xl font-bold text-center mb-2">
          Register New Site
        </h2>
        <div className="card flex items-start justify-center gap-4">
          <form
            onSubmit={handleSubmit}
            className=" flex flex-col gap-4 items-center w-[600px]"
          >
            <div className="row">
              <h3 className=" border-b-2  border-[var(--accent)]  w-full">
                Profile Details
              </h3>
            </div>

            <div className="row">
              <input
                type="text"
                placeholder="Username"
                name="username"
                value={data.username}
                onChange={handleChange}
                className="w-full p-2 rounded-md border border-2 border-[var(--border)] outline-none  focus:border-[var(--accent)] "
              />
              <input
                type={data.visible ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={data.password}
                onChange={handleChange}
                className="w-full p-2 rounded-md border border-2 border-[var(--border)] outline-none  focus:border-[var(--accent)] "
              />
            </div>
            <div className="row">
              <input
                type="text"
                placeholder="Domain Address"
                name="domain"
                value={data.domain}
                onChange={handleChange}
                className="w-full p-2 rounded-md border border-2 border-[var(--border)] outline-none  focus:border-[var(--accent)] "
              />
            </div>
            <div className="row">
              <h3 className=" border-b-2  border-[var(--accent)]  w-full">
                Form Backend Builder
              </h3>
            </div>

            <div className="row">
              <div className="w-full">Name Input </div>
              <div className=" w-full flex gap-2 border border-[var(--border)] rounded-md p-2 items-center ">
                <button className={`py-1 ${!data.nameExtended && "bg-[var(--accent)]"} w-full rounded-md`} onClick={() => setData({ ...data, nameExtended: false })}>Single Input</button>
                <div className=" h-5 w-1 bg-[var(--border)]"></div>
                <button className={`py-1 ${data.nameExtended && "bg-[var(--accent)]"} w-full rounded-md`} onClick={() => setData({ ...data, nameExtended: true })}>Split Input</button>
              </div>
            </div>

            <div className="row">
              <div className="w-full">Phone Input </div>
              <div className=" w-full flex gap-2 border border-[var(--border)] rounded-md p-2 items-center ">
                <button className={`py-1 ${data.phone && "bg-[var(--accent)]"} w-full rounded-md`} onClick={() => setData({ ...data, phone: true })}>Needed</button>
                <div className=" h-5 w-1 bg-[var(--border)]"></div>
                <button className={`py-1 ${!data.phone && "bg-[var(--accent)]"} w-full rounded-md`} onClick={() => setData({ ...data, phone: false })}>Not Needed</button>
              </div>
            </div>






            <div className="row">
              <div className="w-full">Email Notification</div>
              <div className=" w-full flex gap-2 border border-[var(--border)] rounded-md p-2 items-center ">
                <button className={`py-1 ${data.sendEmail && "bg-[var(--accent)]"} w-full rounded-md`} onClick={() => setData({ ...data, sendEmail: true })}>Needed</button>
                <div className=" h-5 w-1 bg-[var(--border)]"></div>
                <button className={`py-1 ${!data.sendEmail && "bg-[var(--accent)]"} w-full rounded-md`} onClick={() => setData({ ...data, sendEmail: false })}>Not Needed</button>
              </div>
            </div>


            <div className="row">
              <div className="w-full">{data.op1 ? "Title of Option 1" : "Option 1"}</div>
              <div className=" w-full flex gap-2 border border-[var(--border)] rounded-md p-2 items-center ">
                {data.op1 ? <>
                  <input type="text" placeholder="Title of Option 1" name="op1Text" value={data.op1Text} onChange={handleChange} className="w-full p-2 rounded-md border border-2 border-[var(--border)] outline-none  focus:border-[var(--accent)] " /> <button className={`py-2 ${data.op1 && "bg-[var(--accent)]"} w-[40px] rounded-md`} onClick={() => setData({ ...data, op1: false })}>X</button>
                </>: <><button className={`py-1 ${data.op1 && "bg-[var(--accent)]"} w-full rounded-md`} onClick={() => setData({ ...data, op1: true })}>Needed</button>
                <div className=" h-5 w-1 bg-[var(--border)]"></div>
                <button className={`py-1 ${!data.op1 && "bg-[var(--accent)]"} w-full rounded-md`} >Not Needed</button></>}
              </div>
            </div>

            <div className="row">
              <div className="w-full">{data.op2 ? "Title of Option 2" : "Option 2"}</div>
              <div className=" w-full flex gap-2 border border-[var(--border)] rounded-md p-2 items-center ">
                {data.op2 ? <>
                  <input type="text" placeholder="Title of Option 1" name="op2Text" value={data.op2Text} onChange={handleChange} className="w-full p-2 rounded-md border border-2 border-[var(--border)] outline-none  focus:border-[var(--accent)] " /> <button className={`py-2 ${data.op2 && "bg-[var(--accent)]"} w-[40px] rounded-md`} onClick={() => setData({ ...data, op2: false })}>X</button>
                </>: <><button className={`py-1 ${data.op2 && "bg-[var(--accent)]"} w-full rounded-md`} onClick={() => setData({ ...data, op2: true })}>Needed</button>
                <div className=" h-5 w-1 bg-[var(--border)]"></div>
                <button className={`py-1 ${!data.op2 && "bg-[var(--accent)]"} w-full rounded-md`} >Not Needed</button></>}
              </div>
            </div>
         










            <button type="submit" className="btn !w-full">
              Create DataBase
            </button>
          </form>

          <div className=" h-full w-1 bg-[var(--border)]"></div>

          <div className=" flex flex-col gap-4 w-[300px] opacity-50">
            <div className="row">
              <h3 className=" border-b-2  border-[var(--accent)]  w-full">
                Form Preview
              </h3>
            </div>
            <div className="formbody rounded-md border border-[var(--border)] p-4 flex flex-col gap-4">


              {data.nameExtended ? <div className="row">
                <div className=" border w-full border-[var(--accent)] p-2 rounded-md select-none pointer-events-none">
                  First name
                </div>
                <div className=" border w-full border-[var(--accent)] p-2 rounded-md select-none pointer-events-none">
                  Last name
                </div>
              </div> :
                <div className=" border border-[var(--accent)] p-2 rounded-md select-none pointer-events-none">
                  name
                </div>}

              <div className=" border border-[var(--accent)] p-2 rounded-md select-none pointer-events-none">
              Email
              </div>

              <div className=" border border-[var(--accent)] px-2 py-6 rounded-md select-none pointer-events-none">
                Message
              </div>

              {data.phone && <div className=" border border-[var(--accent)] p-2 rounded-md select-none pointer-events-none">
                Phone
              </div>}

             {data.op1 && data.op1Text === "" && <div className=" border border-red-500 p-2 rounded-md select-none pointer-events-none">
                {data.op1Text ? data.op1Text : "please select a title"}
              </div>}

              {data.op1 && data.op1Text !== "" && <div className=" border border-[var(--accent)] p-2 rounded-md select-none pointer-events-none">
                {data.op1Text ? data.op1Text : "please select a title"}
              </div>}

              {data.op2 && data.op2Text === "" && <div className=" border border-red-500 p-2 rounded-md select-none pointer-events-none">
                {data.op2Text ? data.op2Text : "please select a title"}
              </div>}

              {data.op2 && data.op2Text !== "" && <div className=" border border-[var(--accent)] p-2 rounded-md select-none pointer-events-none">
                {data.op2Text ? data.op2Text : "please select a title"}
              </div>}

              <div className="btn select-none pointer-events-none">Submit</div>

            </div>

                <div>
                  <p>Email Notification: {data.sendEmail ? <span className="text-emerald-500">Enabled</span> : <span className="text-red-500">Disabled</span>}</p>

                </div>

                {data.sendEmail && <p>Email will be sent to: <span className="text-[var(--accent)]">{data.username}</span></p>}
            
          </div>
        </div>
      </div>
    </div>);
};

export default signup;
