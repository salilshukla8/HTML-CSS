//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace BloodDonation_BackEnd.Models
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class BloodDonationManagementEntities : DbContext
    {
        public BloodDonationManagementEntities()
            : base("name=BloodDonationManagementEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<UserMaster> UserMasters { get; set; }
        public virtual DbSet<BloodBank> BloodBanks { get; set; }
        public virtual DbSet<Campaign> Campaigns { get; set; }
        public virtual DbSet<Stock> Stocks { get; set; }
        public virtual DbSet<Request> Requests { get; set; }
    }
}
