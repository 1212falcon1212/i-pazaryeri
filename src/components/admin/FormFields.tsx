export function TextField({ label, name, defaultValue, required = false }: { label: string; name: string; defaultValue?: string | number | null; required?: boolean }) {
  return <div className="field"><label>{label}</label><input name={name} defaultValue={defaultValue ?? ""} required={required} /></div>;
}

export function TextAreaField({ label, name, defaultValue, required = false }: { label: string; name: string; defaultValue?: string | null; required?: boolean }) {
  return <div className="field full"><label>{label}</label><textarea name={name} defaultValue={defaultValue ?? ""} required={required} /></div>;
}

export function CheckboxField({ label, name, defaultChecked }: { label: string; name: string; defaultChecked?: boolean }) {
  return <label className="field"><span>{label}</span><input name={name} type="checkbox" defaultChecked={defaultChecked} /></label>;
}

