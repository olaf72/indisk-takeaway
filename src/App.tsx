// App.tsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import "./i18n"; // eller "../i18n" avhengig av plasseringen
import { useTranslation } from "react-i18next";
import i18n from "./i18n";
import { LanguageSelector } from "./components/LanguageSelector";
import ContactForm from "./components/ContactForm";




function App() {
  const [cartItems, setCartItems] = useState<{ name: string; price: number; quantity: number }[]>(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const [selectedItem, setSelectedItem] = useState<{ name: string; price: number } | null>(null);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: { name: string; price: number }, quantity: number = 1) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.name === item.name);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, { ...item, quantity }];
      }
    });
    setSelectedItem(null);
  };

  const updateQuantity = (index: number, quantity: number) => {
    setCartItems((prev) => {
      const updated = [...prev];
      if (quantity <= 0) {
        updated.splice(index, 1);
      } else {
        updated[index].quantity = quantity;
      }
      return updated;
    });
  };

  const clearCart = () => setCartItems([]);

  return (
    <Router>
      <div className="min-h-screen bg-white text-gray-900 font-sans">
        <header className="sticky top-0 z-50 bg-red-600 text-white p-4 flex flex-col md:flex-row justify-between items-center gap-4 shadow-md">
          <h1 className="text-3xl font-bold">Indisk Takeaway</h1>
          <nav className="flex flex-wrap gap-4">
            <Link to="/" className="hover:underline focus:outline focus:ring-2">Hjem</Link>
            <Link to="/meny" className="hover:underline focus:outline focus:ring-2">Meny</Link>
            <Link to="/info" className="hover:underline focus:outline focus:ring-2">Info</Link>
            <Link to="/kontakt" className="hover:underline focus:outline focus:ring-2">Kontakt</Link>
            <Link to="/handlekurv" className="hover:underline focus:outline focus:ring-2">Handlekurv ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})</Link>
          </nav>
        </header>

        <main id="main-content" className="p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/meny" element={<Menu onSelectItem={setSelectedItem} />} />
            <Route path="/info" element={<Info />} />
            <Route path="/kontakt" element={<Contact />} />
            <Route path="/handlekurv" element={<Cart cartItems={cartItems} updateQuantity={updateQuantity} clearCart={clearCart} />} />
            <Route path="/sprak" element={<LanguageSelector />} />
            <Route path="/takk" element={<ThankYou />} />
          </Routes>

          {selectedItem && (
            <Modal item={selectedItem} onClose={() => setSelectedItem(null)} onAddToCart={addToCart} />
          )}
        </main>

        <footer className="bg-gray-200 text-center p-4 text-sm mt-8">
          &copy; {new Date().getFullYear()} Indisk Takeaway
        </footer>
      </div>
    </Router>
  );
}


function Home() {
  return (
    <div className="max-w-xl mx-auto mt-10 text-center">
      <h2 className="text-3xl font-bold mb-4 text-red-700">Velkommen til Indisk Takeaway!</h2>
      <p className="text-lg text-gray-700">
        Bestill ekte indisk mat laget med kjærlighet og tradisjon. Vi leverer raskt og smidig direkte til deg!
      </p>
    </div>
  );
}


function Menu({ onSelectItem }: { onSelectItem: (item: { name: string; price: number }) => void }) {
  const allSections = [
    {
      title: "Forretter",
      description: "Alle forretter serveres med salat og mintsaus.",
      items: [
        { name: "Samosa", description: "Sprøstekt butterdeig fylt med krydrede poteter.", price: 79 },
        { name: "Chicken Pakora", description: "Benfri krydret kylling, fritert i kikertmel.", price: 79 },
        { name: "Veggi Pakora", description: "Krydrede friterte poteter og løk i kikertmel.", price: 79 },
        { name: "Mix Pakora", description: "Blanding av kylling og vegetar pakora.", price: 79 },
      ]
    },
    {
      title: "Kyllingretter",
      description: "Serveres med salat og ris.",
      items: [
        { name: "Butter Chicken", description: "Kyllingbiter i krydret ostesaus, fløte og cashewnøtter.", price: 265 },
        { name: "Chili Chicken", description: "Kylling med paprika, rødløk, soyasaus og sweet chili.", price: 259 },
        { name: "Chicken Tikka Masala", description: "Krydret kylling i tomat og cashewnøttsaus.", price: 265 },
        { name: "Chicken Karahi", description: "Kylling i krydret blanding av tomat, løk og ingefær.", price: 265 },
      ]
    },
    {
      title: "Lammeretter",
      description: "Serveres med salat og ris.",
      items: [
        { name: "Lam Tikka Masala", description: "Marinerte lammebiter i kryddersaus med løk og tomat.", price: 279 },
        { name: "Lam Karahi", description: "Lammekjøtt i saus med løk, tomat og ingefær.", price: 259 },
        { name: "Lam Korma", description: "Lammekjøtt i kormasaus med kokosmelk og cashewnøtter.", price: 269 },
        { name: "Rogan Josh", description: "Lammekjøtt i aromatisk curry- og tomatsaus.", price: 285 },
      ]
    },
    {
      title: "Vegetarretter",
      description: "Serveres med salat og ris.",
      items: [
        { name: "Palak Paneer", description: "Spinatcurry med hjemmelaget indisk ost.", price: 239 },
        { name: "Lahori Channa", description: "Kikerter i kryddersaus med tomat og løk.", price: 239 },
        { name: "Butter Paneer", description: "Hjemmelaget ost i tomat-, smør- og fløtesaus.", price: 259 },
      ]
    },
    {
      title: "Nanbrød",
      description: "Gjæret brød.",
      items: [
        { name: "Plain Nan", description: "Gjæret brød.", price: 35 },
        { name: "Garlic Nan", description: "Gjæret brød med hvitløk.", price: 59 },
      ]
    },
    {
      title: "Desserter",
      description: "Indiske desserter.",
      items: [
        { name: "Gajar Halwa", description: "Revet gulrot med melk, sukker, ghee og kardemomme.", price: 79 },
        { name: "Gulab Jamun", description: "Friterte melkekuler i søt sirup med kardemomme.", price: 79 },
      ]
    },
  ];

  let runningIndex = 1;

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <h2 className="text-3xl font-bold text-red-700 mb-6">Meny</h2>
      {allSections.map((section, i) => {
        const sectionWithStart = { ...section, startIndex: runningIndex };
        runningIndex += section.items.length;
        return (
          <section key={i} className="mb-10">
            <h3 className="text-2xl font-semibold text-gray-800 mb-1">{section.title}</h3>
            <p className="text-gray-600 mb-4">{section.description}</p>
            <div className="divide-y">
              {section.items.map((item, index) => {
                const number = sectionWithStart.startIndex + index;
                return (
                  <div key={index} className="py-4 cursor-pointer hover:bg-gray-50" onClick={() => onSelectItem(item)}>
                    <p className="font-semibold">{number < 10 ? `0${number}` : number}. {item.name}</p>
                    <p className="text-sm text-gray-600">{item.description}</p>
                    <p className="text-sm text-gray-800 mt-1">{item.price},00 kr</p>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}

function Modal({ item, onClose, onAddToCart }: { item: { name: string; price: number }, onClose: () => void, onAddToCart: (item: { name: string; price: number }, quantity: number) => void }) {
  const [quantity, setQuantity] = useState(1);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-80">
        <h2 className="text-xl font-bold mb-2">{item.name}</h2>
        <p className="text-gray-700 mb-4">Pris: {item.price},00</p>
        <div className="flex items-center gap-2 mb-4">
          <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="px-3 py-1 bg-gray-200 rounded">-</button>
          <span>{quantity}</span>
          <button onClick={() => setQuantity((q) => q + 1)} className="px-3 py-1 bg-gray-200 rounded">+</button>
        </div>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 text-gray-600 hover:underline">Avbryt</button>
          <button onClick={() => onAddToCart(item, quantity)} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Legg til</button>
        </div>
      </div>
    </div>
  );
}


function MenuItem({ item, addToCart }: { item: { name: string; price: number }, addToCart: (item: { name: string; price: number }, quantity?: number) => void }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="mb-6 border-b pb-4">
      <h3 className="text-lg font-semibold">{item.name}</h3>
      <p className="text-sm text-gray-600">Pris: {item.price},00</p>
      <div className="flex items-center gap-2 mt-2">
        <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="px-2 bg-gray-200">-</button>
        <span>{quantity}</span>
        <button onClick={() => setQuantity((q) => q + 1)} className="px-2 bg-gray-200">+</button>
        <button onClick={() => addToCart(item, quantity)} className="ml-4 bg-green-600 text-white px-4 py-1 rounded">Legg til</button>
      </div>
    </div>
  );
}


function Info() {
  const { t } = useTranslation();

  console.log("Aktivt språk:", i18n.language);
  console.log("Oversettelse av 'title':", t("title"));

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">{t("title")}</h2>
      <p className="mb-2">{t("address")}</p>
      <p className="mb-2">{t("phone")}</p>
      <p className="mb-2 flex items-center gap-2">
        {t("language")} <LanguageSelector />
      </p>
      <p className="mb-2">{t("hours")} <strong>15:00 - 22:30</strong></p>
      <p className="mb-2">{t("pickup")}</p>
      <p className="mb-2">{t("payment")}</p>
    </div>
  );
}



function Accessibility() {
  return <h2 className="text-xl">Les mer om vår tilgjengelighet og universell utforming.</h2>;
}



function Contact() {

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Kontakt</h2>
      <ContactForm />
    </div>
  );
}






function Cart({ cartItems, updateQuantity, clearCart }: { cartItems: { name: string; price: number; quantity: number }[], updateQuantity: (index: number, quantity: number) => void, clearCart: () => void }) {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const navigate = useNavigate();

  const handleCheckout = () => {
    clearCart();
    localStorage.removeItem("cart");
    navigate("/takk");
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Handlekurv</h2>
      {cartItems.length === 0 ? (
        <p>Handlekurven din er tom.</p>
      ) : (
        <>
          <ul className="divide-y">
            {cartItems.map((item, index) => (
              <li key={index} className="py-2 flex justify-between items-center">
                <div>
                  <span className="font-semibold">{item.quantity}x {item.name}</span>
                  <span className="ml-4 text-gray-600">{item.price * item.quantity},00</span>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => updateQuantity(index, item.quantity - 1)} className="px-2 py-1 bg-gray-200">-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(index, item.quantity + 1)} className="px-2 py-1 bg-gray-200">+</button>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-4 font-semibold">Totalt: {total},00</p>
          <button
            onClick={handleCheckout}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Bestill nå
          </button>
        </>
      )}
    </div>
  );
}


function ThankYou() {
  return (
    <div className="text-center mt-20">
      <h2 className="text-3xl font-bold text-green-700 mb-4">Takk for bestillingen!</h2>
      <p className="text-lg">Vi har mottatt din bestilling og starter tilberedningen straks.</p>
      <Link to="/" className="mt-6 inline-block text-blue-600 hover:underline">Tilbake til forsiden</Link>
    </div>
  );
}


export default App;
