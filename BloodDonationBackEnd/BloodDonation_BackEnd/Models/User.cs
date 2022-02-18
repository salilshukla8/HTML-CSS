using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BloodDonation_BackEnd.Models
{
    public class User
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string UserAddress { get; set; }
        public string UserEmail { get; set; }
        public string UserPhone { get; set; }
        public string Type { get; set; }
    }
}