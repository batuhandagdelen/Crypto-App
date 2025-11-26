// % değerini formatlama
export const formatPercentage = (percentage) => {
  if (!percentage) return "N/A";

  const formatted = Math.abs(percentage).toFixed(2);

  const sign = percentage >= 0 ? "+" : "-";

  return `${sign}${formatted}% `;
};

//  büyük sayıyı formatlama

export const formatBigNumber = (number) => {
  if (!number) return "N/A";

  if (number > 1e12) {
    return "$" + (number / 1e12).toFixed(2) + "T";
  } else if (number > 1e9) {
    return "$" + (number / 1e9).toFixed(2) + "Mr";
  } else if (number > 1e6) {
    return "$" + (number / 1e9).toFixed(2) + "Mn";
  } else {
    return "$" + number.toLocaleString();
  }
};

// fiyatı formatlama

export const formatPrice = (price) => {
  if (!price) return "N/A";

  if (price < 0.01) {
    return "$" + price.toFixed(6);
  } else if (price < 1) {
    return "$" + price.toFixed(4);
  } else if (price < 100) {
    return "$" + price.toFixed(2);
  } else {
    return "$" + price.toLocaleString();
  }
};

// tarihi formatla
export const formatDate = (days, timestamp) => {
  const date = new Date(timestamp);

  if (days === 1) {
    // 1 gün seçeiliyse sadece saat ve dakikayı döndür
    return date.toLocaleTimeString("tr", {
      hour: "2-digit",
      minute: "2-digit",
    });
  } else if (days === 7) {
    // 7 gün seçiliyse gün/ay/gün-ismi döndür
    return date.toLocaleDateString("tr", {
      day: "2-digit",
      month: "2-digit",
      weekday: "short",
    });
  } else {
    // 7 günden büyükse gün/ay döndür
    return date.toLocaleDateString("tr", {
      day: "2-digit",
      month: "2-digit",
    });
  }
};
