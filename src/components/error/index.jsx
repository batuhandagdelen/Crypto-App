import React from "react";

const Error = ({ message, refetch }) => {
  return (
    <div className="flex flex-col items-center gap-5 mt-60">
      <h1 className="text-red-500">Üzgünüz bir sorun oluştu... </h1>
      <h2 className="font-semibold text-red-400">{message}</h2>
      <button
        onClick={refetch}
        className="border hover:bg-zinc-200/20 transition rounded py-2 px-4 mt-5 "
      >
        Tekrar Dene
      </button>
    </div>
  );
};

export default Error;
