"use server";
import { Member } from "@prisma/client";
import { prisma } from "../db";

export async function createMember(memberData: Member) {
  try {
    const member = await prisma.member.create({
      data: {
        name: memberData.name,
        email: memberData.email,
        idProof: memberData.idProof,
        package: memberData.package,
        status: memberData.status,
      },
    });

    return member;
  } catch (error) {
    console.log(error);

    return error;
  }
}

export async function getMembers() {
  try {
    const members = await prisma.member.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return members;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getMember(id: string) {
  try {
    const member = await prisma.member.findUnique({
      where: {
        id,
      },
    });

    return member;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function updateMember(id: string, memberData: Member) {
  try {
    const member = await prisma.member.update({
      where: {
        id,
      },

      data: {
        ...memberData,
      },
    });

    return member;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function bulkDeleteMembers(ids: string[]) {
  try {
    const deleteMembers = await prisma.member.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    return deleteMembers;
  } catch (error) {
    console.log(error);
  }
}
