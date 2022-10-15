import { useState, useEffect } from "react";
import { useForm } from "@formspree/react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import "./Images/bg-form.png";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    knowMe: false,
    behaviorRate: 0,
    behaviorMessage: "",
    frontRate: 0,
    frontMessage: "",
  });
  const [state, handleSubmit] = useForm("xnqrdyny");
  const inputClass =
    "overflow-hidden focus:placeholder-white text-gray-200 px-1 m-5 border-b-2 border-gray-600 outline-none placeholder-[#8D8DAA] bg-transparent w-3/4 max-w-[250px]";
  const cardClass =
    "overflow-hidden bg-[url('./Images/bg-form.png')] bg-cover hover:animate-waving-hand rounded shadow-xl p-2 bg-[#092031] w-full mx-auto my-20";
  const buttonClass =
    "overflow-hidden z-10 cursor-pointer shadow-lg duration-200 hover:-translate-y-1 m-2 border-2 border-[#8D8DAA] text-[#092031] p-1 rounded";
  const stepClass =
    "duration-500 align-middle inline-block opacity-50 h-[15px] w-[15px] mx-1 p-1 rounded-full";
  const formClass = "items-center p-2 text-center w-full overflow-hidden";
  const form = [0, 1, 2];
  const [curr, setCurr] = useState(0);

  const [hover, setHover] = useState(0);
  const [hover1, setHover1] = useState(0);
  const [parent0] = useAutoAnimate<HTMLDivElement>();
  const [animate, setAnimate] = useState<boolean[]>([true, false, false]);

  const nextForm = (n: number) => {
    let items = [...animate];
    if (curr + n < -1) return false;

    if (curr === form.length - 1 && n > 0 && validated(curr)) {
      onSubmit();
      return;
    }

    if (n < 0 || validated(curr)) {
      items[curr] = false;
      items[curr + n] = true;
      if (curr + n === 0) {
        document
          .getElementById("back")
          ?.classList.add("invisible", "opacity-0");
      } else if (curr === 0) {
        document
          .getElementById("back")
          ?.classList.remove("invisible", "opacity-0");
      }
      if (curr + n === form.length - 1) {
        document.getElementById("next")!.innerHTML = "submit";
      } else if (curr === form.length - 1 && n < 0) {
        document.getElementById("next")!.innerHTML =
          'nExt <span class="inline-block duration-200 group-hover:translate-x-1">&#187;</span>';
      }
      setCurr(curr + n);
      setAnimate(items);
    }
  };
  const onSubmit = () => {
    handleSubmit({
      name: formData.name,
      email: formData.email,
      "know me": formData.knowMe.toString(),
      "behavior rate": formData.knowMe ? formData.behaviorRate.toString() : "",
      "behavior message": formData.knowMe
        ? formData.behaviorMessage.toString()
        : "",
      "front-end rate": formData.frontRate.toString(),
      "front-end message": formData.frontMessage.toString(),
    });
    nextForm(-form.length);
    setFormData({
      name: "",
      email: "",
      knowMe: false,
      behaviorRate: 0,
      behaviorMessage: "",
      frontRate: 0,
      frontMessage: "",
    });
    document.getElementById("navBtns")!.classList.add("opacity-0", "hidden");
    document.getElementById("navSteps")!.classList.add("opacity-0", "hidden");
  };
  const knowMeFunc = (b: boolean) => {
    const yesRadio = document.getElementById("knowMeYes") as HTMLInputElement;
    const noRadio = document.getElementById("knowMeNo") as HTMLInputElement;
    if (b) {
      yesRadio!.checked = true;
      setFormData((prev) => ({
        ...prev,
        knowMe: true,
      }));
    } else {
      noRadio!.checked = true;
      yesRadio!.checked = true;
      setFormData((prev) => ({
        ...prev,
        knowMe: false,
      }));
    }
  };

  const notifyFunc = (val: string) => {
    const note = document.getElementById("notify");
    if (note!.classList.contains("opacity-0")) {
      note!.innerHTML = val;
      note!.classList.remove("opacity-0", "translate-y-5");
      setTimeout(() => {
        note!.classList.add("opacity-0", "translate-y-5");
      }, 2000);
    }
  };

  const validated = (n: number) => {
    if (n === 0) {
      const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      if (!(formData.email.match(mailformat) || formData.email === "")) {
        notifyFunc("EmAIl nOt vAIld");
        return false;
      }
      return true;
    } else if (n === 1) {
      if (formData.knowMe) {
        if (formData.behaviorRate === 0) {
          notifyFunc("plEAsE prOvIdE rAtE");
          return false;
        }
        if (formData.behaviorMessage.length === 0) {
          notifyFunc("plEAsE prOvIdE fEEdbAck");
          return false;
        }
      }
      return true;
    } else if (n === 2) {
      if (formData.frontRate === 0) {
        notifyFunc("plEAsE prOvIdE rAtE");
        return false;
      }
      if (formData.frontMessage.length === 0) {
        notifyFunc("plEAsE prOvIdE fEEdbAck");
        return false;
      }
      return true;
    }
  };

  useEffect(() => {
    // if (!formData.knowMe) {
    //   setFormData((prev) => ({
    //     ...prev,
    //     behaviorRate: 0,
    //     behaviorMessage: "",
    //   }));
    // }
  }, [formData.knowMe]);
  return (
    <div className="m-auto my-[2px] max-w-3xl">
      <form
        onSubmit={handleSubmit}
        className="animate__animated animate__fadeIn"
      >
        <div className={cardClass}>
          <div>
            <h1 className="text-[#8D8DAA] p-1 m-5 text-3xl font-bold">
              rEvIEw my wOrk
            </h1>
            <hr className="border-[#8D8DAA] inset-x-0" />
          </div>
          <div ref={parent0}>
            {state.succeeded && (
              <div className="p-2 m-2 text-left text-[#8D8DAA]">
                <p className="text-center">rEvIEw wAs sUbmIted sUccessfUlly</p>
                <br />
                <h1>thAnk yOU fOr yOUr rEvIEw</h1>
                <p>
                  I will read your review carefully and make sure that I get the
                  most out of it.
                </p>
              </div>
            )}
            {animate[0] && (
              <div id="0" className={formClass}>
                <div className="w-full">
                  <h1 className="text-[#8D8DAA] p-1 text-lg">
                    whO Is rEvIEwIng mE?
                    <span className="text-[#8D8DAA] p-1 text-xs">
                      ( _*_ OptIOnAl)
                    </span>
                  </h1>
                  <input
                    className={inputClass}
                    id="name"
                    type="name"
                    name="name"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }));
                    }}
                    placeholder="nAmE"
                  />
                  <br />
                  <input
                    className={inputClass}
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }));
                    }}
                    placeholder="EmAIl"
                  />
                </div>
              </div>
            )}
            {animate[1] && (
              <div id="1" className={formClass}>
                <h1 className="text-[#8D8DAA] p-1 text-lg">
                  dId I dO wOrk fOr yOu bEfOrE?
                </h1>
                <input
                  type="radio"
                  id="knowMeYes"
                  name="KnowMe"
                  value="yes"
                  className="hidden"
                />
                <input
                  className="hidden"
                  type="radio"
                  id="knowMeNo"
                  name="KnowMe"
                  value="no"
                />
                <span
                  id="yes"
                  className={
                    buttonClass +
                    " p-[6px] inline-block " +
                    (!formData.knowMe ? "bg-[#8D8DAA]" : "text-[#8D8DAA]")
                  }
                  onClick={() => {
                    knowMeFunc(true);
                  }}
                >
                  yEs
                </span>
                <span
                  id="no"
                  className={
                    buttonClass +
                    " p-[6px] inline-block " +
                    (formData.knowMe ? "bg-[#8D8DAA]" : "text-[#8D8DAA]")
                  }
                  onClick={() => {
                    knowMeFunc(false);
                  }}
                >
                  nO
                </span>
              </div>
            )}
            {animate[1] && formData.knowMe && (
              <div className={formClass}>
                <hr className="border-[#8D8DAA] inset-x-0 w-96 mx-auto" />
                <h1 className="text-[#8D8DAA] p-1 text-lg">
                  rAtE yOUr ExpErIEncE wIth mE
                </h1>
                <div className={buttonClass + " bg-[#8D8DAA] w-fit mx-auto"}>
                  {[...Array(5)].map((star, index) => {
                    index++;
                    return (
                      <span
                        style={{ transitionDelay: "" + index * 100 }}
                        key={index}
                        className={
                          "duration-[650ms] p-2 " +
                          (index <= (hover || formData.behaviorRate)
                            ? "text-white"
                            : "")
                        }
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            behaviorRate: index,
                          }))
                        }
                        onMouseEnter={() => setHover(index)}
                        onMouseLeave={() => setHover(formData.behaviorRate)}
                      >
                        <span className="">✦</span>
                      </span>
                    );
                  })}
                </div>
                <textarea
                  className={inputClass + " max-h-20"}
                  id="message"
                  name="expFeedBack"
                  value={formData.behaviorMessage}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      behaviorMessage: e.target.value,
                    }));
                  }}
                  placeholder="dEtAIlEd fEEdbAck of yOUr ExprIEncE"
                />
                <hr className="border-[#8D8DAA] inset-x-0 w-96 mx-auto" />
              </div>
            )}
            {animate[2] && (
              <div className={formClass}>
                <h1 className="text-[#8D8DAA] p-1 text-lg">
                  rAtE my frOnt End skIlls
                </h1>
                <div className={buttonClass + " bg-[#8D8DAA] w-fit mx-auto"}>
                  {[...Array(5)].map((star, index) => {
                    index++;
                    return (
                      <span
                        style={{ transitionDelay: "" + index * 100 }}
                        key={index}
                        className={
                          "duration-[650ms] p-2 " +
                          (index <= (hover1 || formData.frontRate)
                            ? "text-white"
                            : "")
                        }
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            frontRate: index,
                          }))
                        }
                        onMouseEnter={() => setHover1(index)}
                        onMouseLeave={() => setHover(formData.frontRate)}
                      >
                        <span className="">✦</span>
                      </span>
                    );
                  })}
                </div>
                <textarea
                  className={inputClass + " max-h-20"}
                  id="message"
                  name="expFeedBack"
                  value={formData.frontMessage}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      frontMessage: e.target.value,
                    }));
                  }}
                  placeholder="dEtAIlEd fEEdbAck of my frOnEnd wOrk"
                />
              </div>
            )}

            <div className="absolute inset-x-0 -bottom-20">
              <p
                id="notify"
                className="duration-200 opacity-0 translate-5 rounded-sm shadow-2xl w-fit mx-auto p-2 text-white bg-red-900"
              ></p>
            </div>
          </div>

          {/* <button type="submit" disabled={state.submitting}>
            Submit
          </button> */}
          <ul id="navSteps">
            {form.map((i) => (
              <span
                className={stepClass + (i <= curr ? " bg-white" : " bg-black")}
                key={i}
              ></span>
            ))}
          </ul>
          <div id="navBtns" className="flex justify-between p-2">
            <span
              id="back"
              className={
                buttonClass + " invisible opacity-0 group bg-[#8D8DAA]"
              }
              onClick={() => nextForm(-1)}
            >
              <span className="inline-block duration-200 group-hover:-translate-x-1">
                &#171;
              </span>{" "}
              bAck
            </span>
            <span
              id="next"
              onClick={() => nextForm(1)}
              className={buttonClass + " group bg-[#8D8DAA]"}
            >
              nExt{" "}
              <span className="inline-block duration-200 group-hover:translate-x-1">
                &#187;
              </span>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}
