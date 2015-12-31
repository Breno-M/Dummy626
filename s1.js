function str_replace (search, replace, subject)
            {
                var result = "";
                var  oldi = 0;
                for (i = subject.indexOf (search); i > -1; i = subject.indexOf (search, i))
                {
                    result += subject.substring (oldi, i);
                    result += replace;
                    i += search.length;
                    oldi = i;
                }
                return result + subject.substring (oldi, subject.length);
            }
            
            function attempt (pattern, base_guess)
            {
                if (pattern.exec(guess) != null) return true;
                if (pattern.exec(str_replace("The ", "", guess)) != null) return true;
                if (pattern.exec(str_replace("&", "and", guess)) != null) return true;
                if (pattern.exec(str_replace("'", "", guess)) != null) return true;
                if (pattern.exec(str_replace(",", "", guess)) != null) return true;
                if (pattern.exec(str_replace(":", "", guess)) != null) return true;
                if (pattern.exec(str_replace("-", "", guess)) != null) return true;
                if (pattern.exec(str_replace(".", "", guess)) != null) return true;
                if (pattern.exec(str_replace("/", "", guess)) != null) return true;
                if (pattern.exec(str_replace("&", "and", str_replace("The ", "", guess))) != null) return true;
                return false;
            }
            
            // Uses _ as blank characters, * as wildcards
            function solve ()
            {
                var matches = new Array();
                var t = document.getElementById('clue').value;
                var max_len = document.getElementById('len').value;
                
                // Build into regex
                t = str_replace("_", "[a-z]", t)
                
                console.log(t);
                pattern = new RegExp(t, "i");
                
                for (var i = 0; i < word_list.length; i++)
                {
                    guess = word_list[i];
                    
                    if (max_len >= guess.length)
                    {
                        if (attempt(pattern, guess))
                        {
                            matches.push(guess);
                        }
                    }
                }
                
                var output = "";
                for (var i = 0; i < matches.length; i++)
                {
                    m = matches[i];
                    output += m + "&nbsp;&nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;&nbsp;";
                }
                document.getElementById('output').innerHTML = output;
            }
