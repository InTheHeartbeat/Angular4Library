﻿namespace Angular4Library.Data.Models.Selling
{
    public class SellOrder
    {
        public int Id { get; set; }        
        public bool Authorized { get; set; }
        public int UserId { get; set; }
        public float Sum { get; set; }
        public bool Completed { get; set; }
    }
}