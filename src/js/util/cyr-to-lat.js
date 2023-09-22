function cyrToLat(text) {
	const gost = {
		'а': 'a', 'А': 'A',
		'б': 'b', 'Б': 'B',
		'в': 'v', 'В': 'V',
		'г': 'g', 'Г': 'G',
		'д': 'd', 'Д': 'D',
		'е': 'e', 'Е': 'E',
		'ё': 'e', 'Ё': 'E',
		'ж': 'zh', 'Ж': 'Zh',
		'з': 'z', 'З': 'Z',
		'и': 'i', 'И': 'I',
		'й': 'y', 'Й': 'Y',
		'к': 'k', 'К': 'K',
		'л': 'l', 'Л': 'L',
		'м': 'm', 'М': 'M',
		'н': 'n', 'Н': 'N',
		'о': 'o', 'О': 'O',
		'п': 'p', 'П': 'P',
		'р': 'r', 'Р': 'R',
		'с': 's', 'С': 'S',
		'т': 't', 'Т': 'T',
		'у': 'u', 'У': 'U',
		'ф': 'f', 'Ф': 'F',
		'х': 'kh', 'Х': 'Kh',
		'ц': 'tz', 'Ц': 'Tz',
		'ч': 'ch', 'Ч': 'Ch',
		'ш': 'sh', 'Ш': 'Sh',
		'щ': 'sch', 'Щ': 'Sch',
		'ы': 'y', 'Ы': 'Y',
		'э': 'e', 'Э': 'E',
		'ю': 'iu', 'Ю': 'Iu',
		'я': 'ia', 'Я': 'Ia',
		'ь': '', 'Ь': '',
		'ъ': '', 'Ъ': '',
		'ї': 'yi', 'Ї': 'Yi',
		'і': 'i', 'І': 'I',
		'ґ': 'g', 'Ґ': 'G',
		'є': 'e', 'Є': 'E'
	};

	return text.split('').map(char => gost[char] || char).join('');
}

function getSlug(text, delimiter = '-') {
	const replace_1 = new RegExp('[^A-Za-z0-9' + delimiter + ']+', 'g');
	const replace_2 = new RegExp('[' + delimiter + ']+', 'g');
	const replace_3 = new RegExp('^' + delimiter);
	const replace_4 = new RegExp(delimiter + '$');

	return cyrToLat(text).replaceAll(replace_1, delimiter).replaceAll(replace_2, delimiter).replace(replace_3, '').replace(replace_4, '').toLowerCase();
}
