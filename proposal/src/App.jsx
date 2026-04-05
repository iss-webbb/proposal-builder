import React from "react";
import { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [form, setForm] = useState({
    name: "",
    mail: "",
    deal: "",
    note: "",
    num: "",
    compname: "",
  });
  const [service, setService] = useState("");
  const [quant, setQuant] = useState("");
  const [price, setPrice] = useState("");
  const [press, setPress] = useState([]);
  const [step, setStep] = useState(1);
  const handle = () => setStep(2);
  const before = () => setStep(1);
  const after = () => setStep(3);
  const [loaded, setLoaded] = useState(false);
  const sub =
    form.name.length >= 3 &&
    form.mail.includes("@") &&
    form.compname.length >= 3;
  const not = service != "" && quant != "" && price != "";
  const con = () => console.log({ form, press });
  const [modal, setModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("proposal");
    if (saved) {
      const data = JSON.parse(saved);
      setForm(data.form);
      setPress(data.press);
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem("proposal", JSON.stringify({ form, press }));
  }, [form, press, loaded]);

  return (
    <div className="container">
      {step === 1 && (
        <div>
          <p>Name</p>
          <input
            className="inp"
            type="text"
            value={form.name}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, name: e.target.value }))
            }
          />

          <p>email</p>
          <input
            className="inp"
            type="email"
            value={form.mail}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, mail: e.target.value }))
            }
          />
          {!form.mail.includes("@") && <p>Enter a valid Email</p>}

          <p>Company Name</p>
          <input
            className="inp"
            type="text"
            value={form.compname}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, compname: e.target.value }))
            }
          />

          <p>Deal value</p>
          <input
            className="inp"
            type="text"
            value={form.deal}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, deal: e.target.value }))
            }
          />

          <p>Notes</p>
          <textarea
            value={form.note}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, note: e.target.value }))
            }
          ></textarea>

          <p>Valid Until</p>
          <input
            type="number"
            placeholder="Enter days"
            value={form.num}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, num: e.target.value }))
            }
          />
          <button
            className="btn"
            disabled={!sub}
            style={{ backgroundColor: !sub ? "gray" : "blue" }}
            onClick={handle}
          >
            next
          </button>

          <p>{step} of 3</p>
        </div>
      )}
      {step === 2 && (
        <div>
          {modal && (
            <div className="modal">
              <div className="inside">
                <p>Service Input Name</p>
                <input
                  type="text"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                />

                <p>Quantity</p>
                <input
                  type="number"
                  value={quant}
                  onChange={(e) => setQuant(e.target.value)}
                />

                <p>Price</p>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />

                <button
                  style={{ backgroundColor: "blue" }}
                  onClick={() => {
                    setPress(
                      press.map((item) =>
                        item.id === editingId
                          ? { ...item, service, quant, price }
                          : item,
                      ),
                    );
                    setModal(false);
                    setEditingId(null);

                    setService("");
                    setQuant("");
                    setPrice("");
                  }}
                >
                  submit
                </button>
              </div>
            </div>
          )}

          <p>Service Input Name</p>
          <input
            className="inp"
            type="text"
            value={service}
            onChange={(e) => setService(e.target.value)}
          />

          <p>Quantity</p>
          <input
            className="inp"
            type="number"
            value={quant}
            onChange={(e) => setQuant(e.target.value)}
          />

          <p>Price</p>
          <input
            className="inp"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <button
            className="btn"
            onClick={() => {
              setPress([...press, { service, price, quant, id: Date.now() }]);

              setService("");
              setPrice("");
              setQuant("");
            }}
            disabled={!not}
            style={{ backgroundColor: !not ? "gray" : "blue" }}
          >
            Add
          </button>

          <ul>
            {press.map((item, index) => (
              <li key={index}>
                service: {item.service} <br />
                Quantity: {item.quant} <br />
                Price: {item.price}
                <button
                  style={{ backgroundColor: "blue" }}
                  onClick={() => {
                    setEditingId(item.id);
                    setModal(true);
                  }}
                >
                  Edit
                </button>
                <button
                  style={{ backgroundColor: "blue" }}
                  onClick={() =>
                    setPress(press.filter((item, i) => i !== index))
                  }
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>

          <button
            className="btn"
            style={{ backgroundColor: !sub ? "gray" : "blue" }}
            onClick={before}
          >
            before
          </button>
          <button
            className="btn"
            style={{ backgroundColor: press.length < 1 ? "gray" : "blue" }}
            onClick={after}
            disabled={press.length < 1}
          >
            next
          </button>

          <p>{step} of 3</p>
        </div>
      )}

      {step === 3 && (
        <div className="final">
          <div className="toot">
            <h4>Name: {form.name}</h4>
            <h4>email: {form.mail}</h4>
            <h4> company: {form.compname}</h4>
            <h4>Deal Value: {form.deal}</h4>
            <p>Notes: {form.note}</p>
            <p>Valid until {form.num} Days</p>

            <ul>
              {press.map((item, index) => (
                <li key={index}>
                  {item.service} X quantity: {item.quant} X price: {item.price}{" "}
                  = {item.quant * item.price}
                </li>
              ))}
            </ul>

            <p className="total">
              Grand Total:
              {press.reduce(
                (accumulator, currentItem) =>
                  accumulator + currentItem.quant * currentItem.price,
                0,
              )}
            </p>

            <button
              className="but"
              style={{ backgroundColor: "blue" }}
              onClick={handle}
            >
              before
            </button>
            <button
              className="but"
              style={{ backgroundColor: "blue" }}
              onClick={con}
            >
              submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
