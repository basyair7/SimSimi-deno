const _valueHeaderText = (_id: string): string => {
    return `
<b>Cara settings atau menambahkan commands baru di bot : </b>
<b>Setting atau tambah bot ada di konfigurasi BotFather (https://t.me/BotFather)</b>
<pre>
1. ketik /setcommands di BotFather
2. ketik id bot @${_id}
</pre>
<b>Dan copy text dibawah ini dan kirimkan ke BotFather (https://t.me/BotFather) :</b>`;
};

export default _valueHeaderText;