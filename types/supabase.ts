export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      _prisma_migrations: {
        Row: {
          applied_steps_count: number
          checksum: string
          finished_at: string | null
          id: string
          logs: string | null
          migration_name: string
          rolled_back_at: string | null
          started_at: string
        }
        Insert: {
          applied_steps_count?: number
          checksum: string
          finished_at?: string | null
          id: string
          logs?: string | null
          migration_name: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Update: {
          applied_steps_count?: number
          checksum?: string
          finished_at?: string | null
          id?: string
          logs?: string | null
          migration_name?: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Relationships: []
      }
      ChatContact: {
        Row: {
          about: string
          createdAt: string
          id: string
          name: string
          originalId: string
          phone: string
          profile: string | null
          updatedAt: string
          userId: string
        }
        Insert: {
          about: string
          createdAt?: string
          id: string
          name: string
          originalId: string
          phone: string
          profile?: string | null
          updatedAt: string
          userId: string
        }
        Update: {
          about?: string
          createdAt?: string
          id?: string
          name?: string
          originalId?: string
          phone?: string
          profile?: string | null
          updatedAt?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "ChatContact_userId_fkey"
            columns: ["userId"]
            referencedRelation: "User"
            referencedColumns: ["id"]
          }
        ]
      }
      Contact: {
        Row: {
          about: string
          createdAt: string
          id: string
          name: string
          originalId: string
          phone: string
          profile: string | null
          updatedAt: string
          userId: string
        }
        Insert: {
          about: string
          createdAt?: string
          id: string
          name: string
          originalId: string
          phone: string
          profile?: string | null
          updatedAt: string
          userId: string
        }
        Update: {
          about?: string
          createdAt?: string
          id?: string
          name?: string
          originalId?: string
          phone?: string
          profile?: string | null
          updatedAt?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "Contact_userId_fkey"
            columns: ["userId"]
            referencedRelation: "User"
            referencedColumns: ["id"]
          }
        ]
      }
      Message: {
        Row: {
          content: string
          createdAt: string
          deleted: boolean
          id: string
          type: Database["public"]["Enums"]["MessageType"]
          updatedAt: string
          url: string | null
          userOneId: string
          useTwoId: string
        }
        Insert: {
          content: string
          createdAt?: string
          deleted?: boolean
          id: string
          type?: Database["public"]["Enums"]["MessageType"]
          updatedAt: string
          url?: string | null
          userOneId: string
          useTwoId: string
        }
        Update: {
          content?: string
          createdAt?: string
          deleted?: boolean
          id?: string
          type?: Database["public"]["Enums"]["MessageType"]
          updatedAt?: string
          url?: string | null
          userOneId?: string
          useTwoId?: string
        }
        Relationships: [
          {
            foreignKeyName: "Message_userOneId_fkey"
            columns: ["userOneId"]
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Message_useTwoId_fkey"
            columns: ["useTwoId"]
            referencedRelation: "User"
            referencedColumns: ["id"]
          }
        ]
      }
      User: {
        Row: {
          about: string | null
          createdAt: string
          email: string
          id: string
          name: string | null
          phone: string
          profile: string | null
          updatedAt: string
        }
        Insert: {
          about?: string | null
          createdAt?: string
          email: string
          id: string
          name?: string | null
          phone: string
          profile?: string | null
          updatedAt: string
        }
        Update: {
          about?: string | null
          createdAt?: string
          email?: string
          id?: string
          name?: string | null
          phone?: string
          profile?: string | null
          updatedAt?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      MessageType: "TEXT" | "VIDEO" | "AUDIO" | "PDF" | "DOCUMENT"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

