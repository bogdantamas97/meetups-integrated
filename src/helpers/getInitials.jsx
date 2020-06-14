export const getInitials = (fullName) => {
        if (fullName) {
          return fullName
            .toUpperCase()
            .match(/(\b[A-Z](?!\s))/g)
            .join("");
        }};