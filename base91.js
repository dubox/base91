var base91 = (function(){

    /*
    var base91_alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '!', '#', '$',
    '%', '&', '(', ')', '*', '+', ',', '.', '/', ':', ';', '<', '=',
    '>', '?', '@', '[', ']', '^', '_', '`', '{', '|', '}', '~','-'];
    */


    //"'\
    var base91_alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#$%&()*+,./:;<=>?@[]^_`{|}~-';
    
    
    var base91_char = function(ord){
        if(ord < 0 || ord > 90) throw 'Err: Out of range!';
        
        return base91_alphabet[ord];
    }
    
    var base91_ord = function(char){
        if(char.length > 1) throw 'Err: More than 1 char gave!';
        
        let ord = base91_alphabet.indexOf(char);
        if(ord == -1)throw 'Err: Char not found!';
        return ord;
    }

    var base91 = {
        encode: function(str){
            var bits = 0;
            var bits_count = 0;
            var res_str = '';
            for(let i in str){
                bits += (str.charCodeAt(i)<<bits_count);
                bits_count += 8;
                //console.log(bits.toString(2));
                if(bits_count >= 13){
                    let bit13 = bits % (1<<13);
                    res_str += base91_alphabet[Math.floor(bit13/91)] + base91_alphabet[bit13%91];
                    bits = bits>>>13;
                    bits_count -= 13;
                }
            }
            if(bits > 0){
                let bit13 = bits % (1<<13);
                    res_str += base91_alphabet[Math.floor(bit13/91)] + base91_alphabet[bit13%91];
            }
            return res_str;
        },
        decode:function(str){
            var bits = 0;
            var bits_count = 0;
            var res_str = '';
            for(let i=0 ;i< str.length;i+=2){
                bits += (base91_ord(str[i])*91 + base91_ord(str[i+1]))<<bits_count;
                bits_count += 13;
                while(bits_count >= 8){
                    let bit8 = bits % (1<<8);
                    res_str += String.fromCharCode(bit8);
                    bits = bits>>>8;
                    bits_count -= 8;
                }
            }
            if(bits > 0){
                let bit8 = bits % (1<<8);
                    res_str += String.fromCharCode(bit8);
            }
            return res_str;
        },


        md_encode:function(str){
            return this.encode(escape(str));
        },
        md_decode:function(str){
            return unescape(this.decode(str));
        }
    };


    return base91;


})();




