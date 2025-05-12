import { useState } from "react";

export default function Dashboard() {
  const [aanvragen, setAanvragen] = useState([]);
  const [form, setForm] = useState({
    merk: "",
    bouwjaar: "",
    chassisnummer: "",
    voorkeur: "Nieuw",
    onderdelen: "",
    opmerkingen: "",
  });
  const [volgendNummer, setVolgendNummer] = useState(250001);

  const verstuurAanvraag = () => {
    const nieuweAanvraag = {
      id: volgendNummer,
      ...form,
      status: "Nieuw",
      datum: new Date().toLocaleString(),
    };
    setAanvragen([nieuweAanvraag, ...aanvragen]);
    setVolgendNummer(volgendNummer + 1);
    setForm({
      merk: "", bouwjaar: "", chassisnummer: "",
      voorkeur: "Nieuw", onderdelen: "", opmerkingen: ""
    });
  };

  const updateStatus = (id, status) => {
    setAanvragen(aanvragen.map((a) => a.id === id ? { ...a, status } : a));
  };

  return (
    <div style={{ maxWidth: 800, margin: "auto", padding: 20 }}>
      <h1>Aanvraagformulier</h1>
      <div>
        <input placeholder="Merk/type auto" value={form.merk} onChange={e => setForm({ ...form, merk: e.target.value })} />
        <input placeholder="Bouwjaar" value={form.bouwjaar} onChange={e => setForm({ ...form, bouwjaar: e.target.value })} />
        <input placeholder="Chassisnummer" value={form.chassisnummer} onChange={e => setForm({ ...form, chassisnummer: e.target.value })} />
        <select value={form.voorkeur} onChange={e => setForm({ ...form, voorkeur: e.target.value })}>
          <option>Nieuw</option>
          <option>Gebruikt</option>
        </select>
        <textarea placeholder="Gevraagde onderdelen" value={form.onderdelen} onChange={e => setForm({ ...form, onderdelen: e.target.value })} />
        <textarea placeholder="Opmerkingen" value={form.opmerkingen} onChange={e => setForm({ ...form, opmerkingen: e.target.value })} />
        <button onClick={verstuurAanvraag}>Aanvraag indienen</button>
      </div>
      <h2>Ingekomen aanvragen</h2>
      {aanvragen.map((a) => (
        <div key={a.id} style={{ background: "#fff", padding: 15, marginBottom: 10, border: "1px solid #ccc" }}>
          <strong># {a.id}</strong> <span style={{ float: "right" }}>{a.datum}</span>
          <p><strong>Merk:</strong> {a.merk}</p>
          <p><strong>Bouwjaar:</strong> {a.bouwjaar}</p>
          <p><strong>Chassis:</strong> {a.chassisnummer}</p>
          <p><strong>Voorkeur:</strong> {a.voorkeur}</p>
          <p><strong>Onderdelen:</strong> {a.onderdelen}</p>
          <p><strong>Opmerkingen:</strong> {a.opmerkingen || 'N.V.T.'}</p>
          <p><strong>Status:</strong>
            <select value={a.status} onChange={(e) => updateStatus(a.id, e.target.value)}>
              <option>Nieuw</option>
              <option>In behandeling</option>
              <option>Afgerond</option>
            </select>
          </p>
        </div>
      ))}
    </div>
  );
}
