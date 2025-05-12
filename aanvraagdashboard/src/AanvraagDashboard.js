import { useState } from "react";

export default function AanvraagDashboard() {
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
    setForm({ merk: "", bouwjaar: "", chassisnummer: "", voorkeur: "Nieuw", onderdelen: "", opmerkingen: "" });
  };

  const updateStatus = (id, nieuweStatus) => {
    setAanvragen(
      aanvragen.map((a) => (a.id === id ? { ...a, status: nieuweStatus } : a))
    );
  };

  return (
    <div style={{ maxWidth: '900px', margin: 'auto', padding: '2rem' }}>
      <h1>Aanvraagformulier</h1>
      <div style={{ display: 'grid', gap: '1rem' }}>
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

      <h2 style={{ marginTop: '2rem' }}>Ingekomen aanvragen</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {aanvragen.map((a) => (
          <div key={a.id} style={{ border: '1px solid #ccc', padding: '1rem', background: '#fff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <strong># {a.id}</strong>
              <span>{a.datum}</span>
            </div>
            <p><strong>Merk/type:</strong> {a.merk}</p>
            <p><strong>Bouwjaar:</strong> {a.bouwjaar}</p>
            <p><strong>Chassis:</strong> {a.chassisnummer}</p>
            <p><strong>Voorkeur:</strong> {a.voorkeur}</p>
            <p><strong>Onderdelen:</strong><br />{a.onderdelen}</p>
            <p><strong>Opmerkingen:</strong><br />{a.opmerkingen || 'N.V.T.'}</p>
            <p><strong>Status:</strong> {a.status}</p>
            <select
              value={a.status}
              onChange={(e) => updateStatus(a.id, e.target.value)}
            >
              <option>Nieuw</option>
              <option>In behandeling</option>
              <option>Afgerond</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}
