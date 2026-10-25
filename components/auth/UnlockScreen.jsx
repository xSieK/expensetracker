"use client";

import { useEffect, useState } from "react";
import { Lock } from "lucide-react";

export function UnlockScreen({ onUnlock }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (password.length === 4) {
      handleSubmit({
        preventDefault: () => {},
      });
    }
  }, [password]);

  function handleSubmit(e) {
    e.preventDefault();

    if (
      password === process.env.NEXT_PUBLIC_APP_PASSWORD
    ) {
      sessionStorage.setItem("finora-unlocked", "true");
      onUnlock();
      return;
    }

    setError(true);
    setPassword("");
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#F6F8F6]">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-[#E2E8E3] bg-white p-8 shadow-sm"
      >
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="rounded-xl bg-[#4F7C6C] p-3">
            <Lock color="white" size={26} />
          </div>

          <h1 className="text-xl font-semibold">
            Control de gastos
          </h1>

          <p className="text-sm text-[#6B7A72]">
            Introduce la clave
          </p>
        </div>

        <input
          type="password"
          autoFocus
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError(false);
          }}
          className="
            h-11
            w-full
            rounded-lg
            border
            border-[#E2E8E3]
            px-3
            outline-none
            focus:border-[#4F7C6C]
          "
          placeholder="Contraseña"
        />

        {error && (
          <p className="mt-2 text-sm text-red-600">
            Contraseña incorrecta
          </p>
        )}

        <button
          type="submit"
          className="
            mt-6
            h-11
            w-full
            rounded-lg
            bg-[#4F7C6C]
            text-white
            font-medium
            hover:bg-[#456e60]
            transition-colors
          "
        >
          Desbloquear
        </button>
      </form>
    </div>
  );
}