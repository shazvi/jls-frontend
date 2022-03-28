// pieces_per_internal_box => Pieces per internal box
export const snakeCaseToTitleCase = (str: string): string => {
    const tmp = str.split("_").join(" ");
    return tmp.charAt(0).toUpperCase() + tmp.slice(1);
}
